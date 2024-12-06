import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/audit.log' })
  ]
});

export const auditLog = (req, res, next) => {
  const startTime = Date.now();

  // Log request
  const requestLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip,
    userId: req.user?.id,
    userAgent: req.headers['user-agent'],
  };

  // Log response
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    const responseLog = {
      ...requestLog,
      statusCode: res.statusCode,
      responseTime,
    };

    // Log security-relevant events with appropriate severity
    if (res.statusCode >= 400) {
      logger.warn('Security event', responseLog);
    } else {
      logger.info('API access', responseLog);
    }
  });

  next();
};

export const logSecurityEvent = (event, data) => {
  logger.warn('Security event', {
    event,
    ...data,
    timestamp: new Date().toISOString()
  });
};