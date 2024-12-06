import { Wishlist } from '../models/Wishlist.js';
import { Product } from '../models/Product.js';
import { ApiError } from '../utils/api-error.js';
import { sendPriceAlert, sendLowStockAlert } from '../utils/email.js';

export class WishlistService {
  static async getWishlist(userId) {
    const wishlist = await Wishlist.findOne({ user: userId })
      .populate('products.product');
    
    if (!wishlist) {
      return { products: [] };
    }
    
    return wishlist;
  }

  static async addToWishlist(userId, productId, preferences = {}) {
    const product = await Product.findById(productId);
    if (!product) {
      throw ApiError.notFound('Product not found');
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      {
        $addToSet: {
          products: {
            product: productId,
            ...preferences
          }
        }
      },
      { upsert: true, new: true }
    ).populate('products.product');

    return wishlist;
  }

  static async removeFromWishlist(userId, productId) {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          products: { product: productId }
        }
      },
      { new: true }
    );

    if (!wishlist) {
      throw ApiError.notFound('Wishlist not found');
    }

    return wishlist;
  }

  static async updateWishlistItem(userId, productId, updates) {
    const wishlist = await Wishlist.findOne({
      user: userId,
      'products.product': productId
    });

    if (!wishlist) {
      throw ApiError.notFound('Product not found in wishlist');
    }

    const productIndex = wishlist.products.findIndex(
      p => p.product.toString() === productId
    );

    Object.assign(wishlist.products[productIndex], updates);
    await wishlist.save();

    return wishlist;
  }

  static async checkPriceAlerts(product) {
    const wishlists = await Wishlist.find({
      'products.product': product._id,
      'products.notifyOnPriceChange': true
    }).populate('user');

    for (const wishlist of wishlists) {
      const wishlistItem = wishlist.products.find(
        p => p.product.toString() === product._id.toString()
      );

      if (wishlistItem.priceThreshold) {
        if (
          product.price <= wishlistItem.priceThreshold.usd ||
          product.cryptoPrice.eth <= wishlistItem.priceThreshold.eth ||
          product.cryptoPrice.btc <= wishlistItem.priceThreshold.btc
        ) {
          await sendPriceAlert(wishlist.user, product);
        }
      }
    }
  }

  static async checkLowStockAlerts(product, inventory) {
    const wishlists = await Wishlist.find({
      'products.product': product._id,
      'products.notifyOnLowStock': true
    }).populate('user');

    if (inventory.quantity <= inventory.lowStockThreshold) {
      for (const wishlist of wishlists) {
        await sendLowStockAlert(wishlist.user, product, inventory.quantity);
      }
    }
  }
}