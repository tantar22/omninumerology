import { Router } from 'express';
import { calculateMatrixHandler } from '../controllers/matrix.controller';

const router = Router();

router.post('/calculate', calculateMatrixHandler);

export default router;
