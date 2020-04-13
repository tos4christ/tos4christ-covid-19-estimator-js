import o2x from 'object-to-xml';
import estimator from '../../src/estimator';

const xmlController = (req, res) => {
  const { body } = req;
  const response = estimator(body);
  res.contentType('text/xml');
  res.set('Content-Type', 'text/xml');
  res.status(200).send(o2x({
    '?xml version="1.0" encoding="UTF-8"?': null,
    response
  }));
};

export default xmlController;
