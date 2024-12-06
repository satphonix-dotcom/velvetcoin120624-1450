import { Review } from '../models/Review.js';
import { Order } from '../models/Order.js';
import { ApiError } from '../utils/api-error.js';
import { sendReviewNotification } from '../utils/email.js';

export class ReviewService {
  static async getProductReviews(productId, options = {}) {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt'
    } = options;

    const query = {
      product: productId,
      status: 'approved'
    };

    const reviews = await Review.find(query)
      .populate('user', 'firstName lastName')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Review.countDocuments(query);

    return {
      reviews,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  static async createReview(data) {
    // Check if user has purchased the product
    const hasOrdered = await Order.exists({
      customer: data.user,
      'items.product': data.product,
      status: 'delivered'
    });

    // Check if user has already reviewed the product
    const existingReview = await Review.findOne({
      user: data.user,
      product: data.product
    });

    if (existingReview) {
      throw ApiError.badRequest('You have already reviewed this product');
    }

    const review = new Review({
      ...data,
      verifiedPurchase: Boolean(hasOrdered)
    });

    await review.save();

    // Send notification to product vendor
    await sendReviewNotification(review);

    return review;
  }

  static async updateReview(reviewId, userId, updates) {
    const review = await Review.findById(reviewId);
    
    if (!review) {
      throw ApiError.notFound('Review not found');
    }

    if (review.user.toString() !== userId.toString()) {
      throw ApiError.forbidden('Not authorized to update this review');
    }

    // Reset status to pending if content is updated
    if (updates.content || updates.rating) {
      updates.status = 'pending';
    }

    Object.assign(review, updates);
    await review.save();

    return review;
  }

  static async deleteReview(reviewId, userId) {
    const review = await Review.findById(reviewId);
    
    if (!review) {
      throw ApiError.notFound('Review not found');
    }

    if (review.user.toString() !== userId.toString()) {
      throw ApiError.forbidden('Not authorized to delete this review');
    }

    await review.deleteOne();
  }

  static async markHelpful(reviewId, userId) {
    const review = await Review.findById(reviewId);
    
    if (!review) {
      throw ApiError.notFound('Review not found');
    }

    const alreadyMarked = review.helpful.some(
      h => h.user.toString() === userId.toString()
    );

    if (alreadyMarked) {
      review.helpful = review.helpful.filter(
        h => h.user.toString() !== userId.toString()
      );
    } else {
      review.helpful.push({ user: userId });
    }

    await review.save();
    return review;
  }

  static async reportReview(reviewId, userId, reason) {
    const review = await Review.findById(reviewId);
    
    if (!review) {
      throw ApiError.notFound('Review not found');
    }

    const alreadyReported = review.reported.some(
      r => r.user.toString() === userId.toString()
    );

    if (alreadyReported) {
      throw ApiError.badRequest('You have already reported this review');
    }

    review.reported.push({
      user: userId,
      reason,
      createdAt: new Date()
    });

    // Auto-reject if reported multiple times
    if (review.reported.length >= 3) {
      review.status = 'rejected';
    }

    await review.save();
    return review;
  }

  static async updateReviewStatus(reviewId, status) {
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { status },
      { new: true }
    );

    if (!review) {
      throw ApiError.notFound('Review not found');
    }

    return review;
  }

  static async getReviewStats(productId) {
    const stats = await Review.aggregate([
      { $match: { product: productId, status: 'approved' } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: {
              rating: '$rating',
              count: 1
            }
          }
        }
      }
    ]);

    if (!stats.length) {
      return {
        avgRating: 0,
        totalReviews: 0,
        ratingDistribution: {}
      };
    }

    // Format rating distribution
    const distribution = stats[0].ratingDistribution.reduce((acc, curr) => {
      acc[curr.rating] = (acc[curr.rating] || 0) + curr.count;
      return acc;
    }, {});

    return {
      avgRating: Math.round(stats[0].avgRating * 10) / 10,
      totalReviews: stats[0].totalReviews,
      ratingDistribution: distribution
    };
  }
}