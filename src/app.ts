import express from 'express';
import { securityMiddleware } from './middlewares/security';
import { errorHandler } from './middlewares/errorHandler';
import { logRequests } from './middlewares/logRequests';
import { logger } from './config/logger';
import mainroutes from './routes/index';

export const app = express();

app.use(express.json());
app.use(securityMiddleware);
app.use(logRequests);

app.use('/api/v1', mainroutes);

app.use(errorHandler);

logger.info('Express app configured');
