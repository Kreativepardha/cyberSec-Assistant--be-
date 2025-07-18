import { Router } from 'express';
import analysisRoutes from './analysis.route';
import scanRoutes from './scan.route';

const router = Router();
router.use('/analysis', analysisRoutes);
router.use('/scan', scanRoutes);

export default router;
