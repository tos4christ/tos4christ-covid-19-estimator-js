import { Router } from 'express';
import responderController from '../Controllers/responderController';

const router = new Router();

router.post('/', responderController.register);
router.post('/signin', responderController.signin);

export default router;
