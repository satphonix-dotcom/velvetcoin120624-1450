import { Promotion } from '../models/Promotion.js';
import { PromotionUsage } from '../models/PromotionUsage.js';
import { ApiError } from '../utils/api-error.js';

export class PromotionService {
  static async validatePromotion(code, userId, cart) {
    const promotion = await Promotion.findOne({
      code: code.toUpperCase(),
      active: true,
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    });

    if (!promotion) {
      throw ApiError.badRequest('Invalid promotion code');
    }

    // Check usage limits
    if (promotion.usageLimit) {
      // Check total usage
      if (promotion.usageLimit.total && 
          promotion.usageCount >= promotion.usageLimit.total) {
        throw ApiError.badRequest('Promotion code has reached its usage limit');
      }

      // Check per-user usage
      if (promotion.usageLimit.perUser) {
        const userUsage = await PromotionUsage.countDocuments({
          promotion: promotion._id,
          user: userId
        });
        
        if (userUsage >= promotion.usageLimit.perUser) {
          throw ApiError.badRequest('You have reached the usage limit for this promotion');
        }
      }
    }

    // Validate minimum purchase
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (subtotal < promotion.minimumPurchase) {
      throw ApiError.badRequest(
        `Minimum purchase of $${promotion.minimumPurchase} required`
      );
    }

    // Validate conditions
    if (promotion.conditions) {
      // Check product conditions
      if (promotion.conditions.products?.length > 0) {
        const hasValidProduct = cart.items.some(item =>
          promotion.conditions.products.includes(item.product)
        );
        if (!hasValidProduct) {
          throw ApiError.badRequest('Promotion not valid for these products');
        }
      }

      // Check category conditions
      if (promotion.conditions.categories?.length > 0) {
        const hasValidCategory = cart.items.some(item =>
          promotion.conditions.categories.includes(item.category)
        );
        if (!hasValidCategory) {
          throw ApiError.badRequest('Promotion not valid for these categories');
        }
      }

      // Check designer conditions
      if (promotion.conditions.designers?.length > 0) {
        const hasValidDesigner = cart.items.some(item =>
          promotion.conditions.designers.includes(item.designer)
        );
        if (!hasValidDesigner) {
          throw ApiError.badRequest('Promotion not valid for these designers');
        }
      }

      // Check user type conditions
      if (promotion.conditions.userTypes?.length > 0) {
        // Implement user type validation logic
      }
    }

    return promotion;
  }

  static calculateDiscount(promotion, cart) {
    let discount = 0;

    switch (promotion.type) {
      case 'percentage':
        discount = cart.items.reduce((sum, item) => {
          // Check if item is eligible for discount
          if (this.isItemEligible(item, promotion)) {
            return sum + (item.price * item.quantity * promotion.value / 100);
          }
          return sum;
        }, 0);
        break;

      case 'fixed':
        discount = promotion.value;
        break;

      case 'bogo':
        // Buy One Get One logic
        cart.items.forEach(item => {
          if (this.isItemEligible(item, promotion) && item.quantity >= 2) {
            const freeItems = Math.floor(item.quantity / 2);
            discount += item.price * freeItems;
          }
        });
        break;

      case 'shipping':
        // Free or discounted shipping logic
        discount = promotion.value;
        break;
    }

    // Apply maximum discount if set
    if (promotion.maximumDiscount) {
      discount = Math.min(discount, promotion.maximumDiscount);
    }

    return Math.round(discount * 100) / 100;
  }

  static isItemEligible(item, promotion) {
    if (!promotion.conditions) return true;

    const { products, categories, designers } = promotion.conditions;

    return (
      (!products?.length || products.includes(item.product)) &&
      (!categories?.length || categories.includes(item.category)) &&
      (!designers?.length || designers.includes(item.designer))
    );
  }

  static async recordUsage(promotionId, userId, orderId, discountAmount) {
    const usage = new PromotionUsage({
      promotion: promotionId,
      user: userId,
      order: orderId,
      discountAmount
    });

    await usage.save();

    // Update promotion usage count
    await Promotion.findByIdAndUpdate(promotionId, {
      $inc: { usageCount: 1 }
    });
  }

  static async getActivePromotions() {
    return Promotion.find({
      active: true,
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    }).sort('endDate');
  }

  static async createPromotion(data) {
    const promotion = new Promotion(data);
    await promotion.save();
    return promotion;
  }

  static async updatePromotion(id, updates) {
    const promotion = await Promotion.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!promotion) {
      throw ApiError.notFound('Promotion not found');
    }

    return promotion;
  }

  static async deletePromotion(id) {
    const promotion = await Promotion.findById(id);
    
    if (!promotion) {
      throw ApiError.notFound('Promotion not found');
    }

    // Soft delete by deactivating
    promotion.active = false;
    await promotion.save();
  }
}