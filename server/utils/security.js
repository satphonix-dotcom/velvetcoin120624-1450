import { createHash, randomBytes } from 'crypto';
import { logSecurityEvent } from '../middleware/audit.js';

export const generateNonce = () => {
  return randomBytes(32).toString('base64');
};

export const validateSignature = (message, signature, publicKey) => {
  // Implement signature validation logic
  // This would depend on the specific crypto implementation being used
};

export const detectSuspiciousActivity = (req) => {
  const suspiciousPatterns = [
    /union\s+select/i,
    /execute\s+immediate/i,
    /<script>/i,
    /javascript:/i,
    /data:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i
  ];

  // Check request parameters
  const params = { ...req.query, ...req.body };
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(value)) {
          logSecurityEvent('suspicious_input_detected', {
            pattern: pattern.toString(),
            param: key,
            value,
            ip: req.ip
          });
          return true;
        }
      }
    }
  }

  // Rate limiting check
  const clientIp = req.ip;
  const now = Date.now();
  const requestCount = getRequestCount(clientIp, now - 60000); // Last minute
  if (requestCount > 100) { // More than 100 requests per minute
    logSecurityEvent('rate_limit_exceeded', {
      ip: clientIp,
      requestCount,
      timeWindow: '1m'
    });
    return true;
  }

  return false;
};

export const validateInput = (input, type) => {
  const patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    username: /^[a-zA-Z0-9_-]{3,16}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    walletAddress: /^0x[a-fA-F0-9]{40}$/,
    url: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
    ipAddress: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  };

  return patterns[type]?.test(input) ?? false;
};

export const sanitizeHtml = (html) => {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Request counting for rate limiting
const requestCounts = new Map();

function getRequestCount(ip, since) {
  const requests = requestCounts.get(ip) || [];
  const recentRequests = requests.filter(time => time > since);
  requestCounts.set(ip, recentRequests);
  return recentRequests.length;
}

export function addRequest(ip) {
  const requests = requestCounts.get(ip) || [];
  requests.push(Date.now());
  requestCounts.set(ip, requests);
}