import { Router } from 'express';
import { hourClockHandler } from '../controllers/timing.controller';

const router = Router();

router.post('/hour-clock', hourClockHandler);

export default router;
