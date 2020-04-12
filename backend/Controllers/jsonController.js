import estimator from '../../build/estimator';

const jsonController = (req, res, next) => {
    const { body } = req;
    const response = estimator(body);
    res.json(response);
};

export default jsonController;
