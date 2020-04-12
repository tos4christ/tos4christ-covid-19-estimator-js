import { Router } from 'express';
import jsonController from '../Controllers/jsonController';
import xmlController from '../Controllers/xmlController';

const router = Router();

router.post('/', jsonController);
router.post('/json', jsonController);
router.post('/xml', xmlController);

export default router;
