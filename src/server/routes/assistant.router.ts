import { Router } from 'express';
import { assistantChatHandler } from '../controllers/assistant.controller';

const router = Router();

router.post('/chat', assistantChatHandler);

export default router;
