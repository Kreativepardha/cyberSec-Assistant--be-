import { Router } from 'express';
import { ingestToolText, runAnalysis } from '../controllers/analysis.controller';

const router = Router();

router.post('/', runAnalysis);
router.post('/upload', ingestToolText);

export default router;
