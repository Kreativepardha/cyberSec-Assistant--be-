import { logger } from '../config/logger';

export function errorHandler(err, req, res, next) {
  logger.error('Unhandled error', { err, path: req.path });
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}
