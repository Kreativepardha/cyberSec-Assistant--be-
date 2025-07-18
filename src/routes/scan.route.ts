import { Router } from 'express';
import multer from 'multer';
import { handleScanAI, handleScanUpload } from '../controllers/aiScan.controller';

const upload = multer();
const router = Router();

router.post('/', handleScanAI);
router.post('/upload', upload.single('file'), handleScanUpload);

export default router; 