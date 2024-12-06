import { Inventory } from '../models/Inventory.js';
import { AppError } from '../utils/appError.js';

export class InventoryService {
  static async reserveInventory(orderId, items) {
    const session = await Inventory.startSession();
    session.startTransaction();

    try {
      for (const item of items) {
        const inventory = await Inventory.findOne({ product: item.product });
        if (!inventory) {
          throw new AppError(`Inventory not found for product ${item.product}`, 404);
        }

        if (inventory.quantity - inventory.reservedQuantity < item.quantity) {
          throw new AppError(`Insufficient inventory for product ${item.product}`, 400);
        }

        inventory.reservedQuantity += item.quantity;
        await inventory.save({ session });
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async releaseInventory(orderId, items) {
    const session = await Inventory.startSession();
    session.startTransaction();

    try {
      for (const item of items) {
        const inventory = await Inventory.findOne({ product: item.product });
        if (!inventory) continue;

        inventory.reservedQuantity = Math.max(0, inventory.reservedQuantity - item.quantity);
        await inventory.save({ session });
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async commitInventory(orderId, items) {
    const session = await Inventory.startSession();
    session.startTransaction();

    try {
      for (const item of items) {
        const inventory = await Inventory.findOne({ product: item.product });
        if (!inventory) continue;

        inventory.quantity -= item.quantity;
        inventory.reservedQuantity -= item.quantity;
        await inventory.save({ session });

        // Check low stock threshold
        if (inventory.quantity <= inventory.lowStockThreshold) {
          // Trigger low stock notification
          await NotificationService.sendLowStockAlert(inventory);
        }
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}