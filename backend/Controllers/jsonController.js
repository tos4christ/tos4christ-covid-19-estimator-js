import estimator from '../../src/estimator';

const jsonController = (req, res) => {
  const { body } = req;
  const response = estimator(body);
  res.json(response);
};

export default jsonController;
