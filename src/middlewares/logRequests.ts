import { logger } from '../config/logger';
import type { Request, Response, NextFunction } from 'express';

export const logRequests = (req: Request, res: Response, next: NextFunction) => {
  logger.http(`${req.method} ${req.originalUrl}`);
  next();
};
