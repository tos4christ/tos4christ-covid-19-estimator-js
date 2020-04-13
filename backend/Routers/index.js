import { Router } from 'express';
import jsonController from '../Controllers/jsonController';
import xmlController from '../Controllers/xmlController';
import logsController from '../Controllers/logsController';

const router = Router();

router.post('/', jsonController);
router.post('/json', jsonController);
router.post('/xml', xmlController);
router.get('/logs', logsController);

export default router;
