import { Router } from 'express';
import signinController from '../Controllers/signinController';

const router = new Router();

router.post('/', signinController);

export default router;
