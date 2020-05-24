import { Router } from 'express';
import jsonController from '../Controllers/jsonController';
import xmlController from '../Controllers/xmlController';
import logsController from '../Controllers/logsController';
import mapsController from '../Controllers/mapsController';
import signupRoute from './signupRoute';
import signinRoute from './signinRoute';
// import jwtCheck from '../utility/jwtCheck';

const router = Router();

router.post('/', jsonController);
router.post('/json', jsonController);
router.post('/xml', xmlController);
router.get('/logs', logsController);
router.post('/maps', mapsController);
router.use('/signup', signupRoute);
router.use('/signin', signinRoute);


export default router;
