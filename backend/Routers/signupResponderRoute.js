import { Router } from 'express';
import responderController from '../Controllers/responderController';

const router = new Router();

router.post('/', responderController);

export default router;
