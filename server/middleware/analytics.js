```javascript
import { AnalyticsService } from '../services/AnalyticsService.js';
import { parseUserAgent } from '../utils/device.js';
import { getGeoLocation } from '../utils/geo.js';

export const trackAnalytics = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionId || req.headers['x-session-id'];
    const userId = req.user?._id;
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;

    // Skip tracking for certain paths
    if (req.path.startsWith('/health') || req.path.startsWith('/metrics')) {
      return next();
    }

    const deviceInfo = parseUserAgent(userAgent);
    const location = await getGeoLocation(ip);

    const baseEventData = {
      sessionId,
      userId,
      deviceInfo,
      location,
      timestamp: new Date()
    };

    // Track page views
    if (req.method === 'GET' && !req.path.startsWith('/api/')) {
      await AnalyticsService.trackEvent({
        ...baseEventData,
        type: 'pageView',
        data: {
          url: req.originalUrl
        }
      });
    }

    // Track product views
    if (req.path.match(/^\/api\/products\/[\w-]+$/) && req.method === 'GET') {
      await AnalyticsService.trackEvent({
        ...baseEventData,
        type: 'productView',
        data: {
          productId: req.params.id
        }
      });
    }

    // Track searches
    if (req.path === '/api/products' && req.query.search) {
      await AnalyticsService.trackEvent({
        ...baseEventData,
        type: 'search',
        data: {
          searchQuery: req.query.search
        }
      });
    }

    // Track add to cart
    if (req.path === '/api/cart' && req.method === 'POST') {
      await AnalyticsService.trackEvent({
        ...baseEventData,
        type: 'addToCart',
        data: {
          productId: req.body.productId,
          quantity: req.body.quantity
        }
      });
    }

    // Track purchases
    if (req.path === '/api/orders' && req.method === 'POST') {
      await AnalyticsService.trackEvent({
        ...baseEventData,
        type: 'purchase',
        data: {
          orderId: res.locals.orderId, // Set by order creation handler
          revenue: res.locals.orderTotal
        }
      });
    }

    // Track promotion usage
    if (req.path.match(/^\/api\/promotions\/validate$/)) {
      await AnalyticsService.trackEvent({
        ...baseEventData,
        type: 'promotion',
        data: {
          promotionCode: req.body.code
        }
      });
    }

    next();
  } catch (error) {
    // Log error but don't block the request
    console.error('Analytics tracking error:', error);
    next();
  }
};
```