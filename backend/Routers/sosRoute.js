import { Router } from 'express';

import sosController from '../Controllers/sosController';

const router = new Router();

router.post('/', sosController);

export default router;
