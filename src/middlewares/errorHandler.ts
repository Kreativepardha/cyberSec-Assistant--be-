import type { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error('Global error', { err, path: req.path });
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}
