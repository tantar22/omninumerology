import { Router } from 'express';
import { synastryPairHandler, synastryTeamHandler } from '../controllers/synastry.controller';

const router = Router();

router.post('/pair', synastryPairHandler);
router.post('/team', synastryTeamHandler);

export default router;
