import { Router } from 'express';
import signupController from '../Controllers/signupController';

const router = new Router();

router.post('/', signupController);

export default router;
