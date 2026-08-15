import { Router } from 'express';
import { oracleChatHandler } from '../controllers/oracle.controller';

const router = Router();

router.post('/chat', oracleChatHandler);

export default router;
