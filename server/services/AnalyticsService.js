```javascript
import { Analytics } from '../models/Analytics.js';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

export class AnalyticsService {
  static async trackEvent(eventData) {
    const event = new Analytics(eventData);
    await event.save();
    return event;
  }

  static async getSalesAnalytics(params = {}) {
    const {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate = new Date(),
      groupBy = 'day'
    } = params;

    const groupByConfig = {
      hour: {
        $dateToString: { format: '%Y-%m-%d-%H', date: '$createdAt' }
      },
      day: {
        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
      },
      week: {
        $dateToString: { format: '%Y-%U', date: '$createdAt' }
      },
      month: {
        $dateToString: { format: '%Y-%m', date: '$createdAt' }
      }
    };

    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: { $nin: ['cancelled', 'refunded'] }
        }
      },
      {
        $group: {
          _id: groupByConfig[groupBy],
          revenue: { $sum: '$total.usd' },
          orders: { $sum: 1 },
          items: { $sum: { $size: '$items' } },
          cryptoRevenue: {
            eth: { $sum: '$total.eth' },
            btc: { $sum: '$total.btc' }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return salesData;
  }

  static async getProductAnalytics(params = {}) {
    const {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate = new Date()
    } = params;

    const productViews = await Analytics.aggregate([
      {
        $match: {
          type: 'productView',
          timestamp: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$data.productId',
          views: { $sum: 1 },
          uniqueUsers: { $addToSet: '$userId' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $project: {
          product: 1,
          views: 1,
          uniqueViews: { $size: '$uniqueUsers' },
          conversionRate: {
            $divide: [
              { $size: '$uniqueUsers' },
              '$views'
            ]
          }
        }
      },
      { $sort: { views: -1 } }
    ]);

    return productViews;
  }

  static async getUserAnalytics(params = {}) {
    const {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate = new Date()
    } = params;

    const userStats = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          newUsers: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const userActivity = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate, $lte: endDate },
          userId: { $exists: true }
        }
      },
      {
        $group: {
          _id: '$userId',
          sessions: { $addToSet: '$sessionId' },
          pageViews: {
            $sum: {
              $cond: [{ $eq: ['$type', 'pageView'] }, 1, 0]
            }
          },
          productViews: {
            $sum: {
              $cond: [{ $eq: ['$type', 'productView'] }, 1, 0]
            }
          },
          addToCarts: {
            $sum: {
              $cond: [{ $eq: ['$type', 'addToCart'] }, 1, 0]
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          avgSessionsPerUser: { $avg: { $size: '$sessions' } },
          avgPageViewsPerUser: { $avg: '$pageViews' },
          avgProductViewsPerUser: { $avg: '$productViews' },
          avgAddToCartsPerUser: { $avg: '$addToCarts' }
        }
      }
    ]);

    return {
      userStats,
      userActivity: userActivity[0]
    };
  }

  static async getSearchAnalytics(params = {}) {
    const {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate = new Date()
    } = params;

    const searchStats = await Analytics.aggregate([
      {
        $match: {
          type: 'search',
          timestamp: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$data.searchQuery',
          count: { $sum: 1 },
          uniqueUsers: { $addToSet: '$userId' }
        }
      },
      {
        $project: {
          searchQuery: '$_id',
          count: 1,
          uniqueUsers: { $size: '$uniqueUsers' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 100 }
    ]);

    return searchStats;
  }

  static async getPromotionAnalytics(params = {}) {
    const {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate = new Date()
    } = params;

    const promotionStats = await Analytics.aggregate([
      {
        $match: {
          type: 'promotion',
          timestamp: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$data.promotionCode',
          uses: { $sum: 1 },
          revenue: { $sum: '$data.revenue.usd' },
          uniqueUsers: { $addToSet: '$userId' }
        }
      },
      {
        $project: {
          promotionCode: '$_id',
          uses: 1,
          revenue: 1,
          uniqueUsers: { $size: '$uniqueUsers' },
          averageOrderValue: { $divide: ['$revenue', '$uses'] }
        }
      },
      { $sort: { uses: -1 } }
    ]);

    return promotionStats;
  }

  static async getGeographicAnalytics(params = {}) {
    const {
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate = new Date()
    } = params;

    const geoStats = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate, $lte: endDate },
          'location.country': { $exists: true }
        }
      },
      {
        $group: {
          _id: {
            country: '$location.country',
            region: '$location.region'
          },
          sessions: { $addToSet: '$sessionId' },
          users: { $addToSet: '$userId' },
          pageViews: {
            $sum: {
              $cond: [{ $eq: ['$type', 'pageView'] }, 1, 0]
            }
          },
          orders: {
            $sum: {
              $cond: [{ $eq: ['$type', 'purchase'] }, 1, 0]
            }
          },
          revenue: {
            $sum: {
              $cond: [
                { $eq: ['$type', 'purchase'] },
                '$data.revenue.usd',
                0
              ]
            }
          }
        }
      },
      {
        $group: {
          _id: '$_id.country',
          regions: {
            $push: {
              name: '$_id.region',
              sessions: { $size: '$sessions' },
              users: { $size: '$users' },
              pageViews: '$pageViews',
              orders: '$orders',
              revenue: '$revenue'
            }
          },
          totalSessions: { $sum: { $size: '$sessions' } },
          totalUsers: { $sum: { $size: '$users' } },
          totalPageViews: { $sum: '$pageViews' },
          totalOrders: { $sum: '$orders' },
          totalRevenue: { $sum: '$revenue' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    return geoStats;
  }
}
```