import express from 'express';
import { securityMiddleware } from './middlewares/security';
import { errorHandler } from './middlewares/errorHandler';
import { logRequests } from './middlewares/logRequests';
import { logger } from './config/logger';
import mainroutes from './routes/index';

const app = express();

app.use(express.json());
app.use(securityMiddleware);
app.use(logRequests);

app.use('/api/v1', mainroutes);

app.get('/health', (_req, res) => {
    logger.info('Health Check Pinged.')
    res.send('Cybersecurity Knowledge Assitant is Running')
})

app.use(errorHandler);

logger.info('Express app configured');

export default app;