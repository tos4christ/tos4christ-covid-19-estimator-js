import o2x from 'object-to-xml';
import estimator from '../../src/estimator';

const xmlController = (req, res) => {
  const { body } = req;
  const response = estimator(body);
  res.status = 200;
  res.set('Content-Type', 'text/xml');
  res.send(o2x({
    '?xml version="1.0" encoding="iso-8859-1"?': null,
    response
  }));
};

export default xmlController;
