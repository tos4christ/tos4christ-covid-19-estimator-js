import o2x from 'object-to-xml';
import estimator from '../../build/estimator';

const xmlController = (req, res, next) => {
    const { body } = req;
    const response = estimator(body);
    res.set('Content-Type', 'text/xml');
    res.send(o2x(response));
};

export default xmlController;
