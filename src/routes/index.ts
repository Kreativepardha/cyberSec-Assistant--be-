import { Router } from 'express';
import analysisRoutes from './analysis.route';

const router = Router();
router.use('/analysis', analysisRoutes);

export default router;
