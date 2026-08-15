import { Router } from 'express';
import { optimizeNameHandler } from '../controllers/optimize.controller';

const router = Router();

router.post('/name', optimizeNameHandler);

export default router;
