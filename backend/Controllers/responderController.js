import jwt from 'jsonwebtoken';
import encoder from '../utility/passwordEnc';
import RespondersModel from '../Models/responderModel';

const respondersController = {};

respondersController.register = (req, res) => {
  if (!req.body.email && !req.body.password) {
    res.status(400).json({
      status: 'error',
      error: 'Email and password field cannot be empty'
    });
    return;
  }
  const hashedPassword = encoder.hash(req.body.password, 9);
  req.body.password = hashedPassword;
  const creationDate = new Date().toLocaleDateString;
  req.body.creationDate = creationDate;
  RespondersModel.createResponder(req.body).then((result) => {
    const { _id: userId } = result;
    // create a token to send back to the user
    const token = jwt.sign({
      sub: userId
    }, process.env.TOKENKEY, { expiresIn: 1440 });
    // response body to send to frontend
    const responseBody = {
      status: 'Success',
      data: {
        message: 'Your account has been successfully created',
        token,
        userId
      }
    };
    res.status(201).json(responseBody);
  })
    .catch((err) => {
      res.status(401).json(err.message);
    });
};

respondersController.signin = (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(400).json({
      status: 'error',
      error: 'Email and password field cannot be empty'
    });
    return;
  }
  RespondersModel.getRespondersByEmail(email).then((result) => {
    const passwordMatch = encoder.decode(password, result.password);
    if (passwordMatch) {
      const { _id: userId } = result;
      // inside the database operation, store the jwt
      const token = jwt.sign({
        sub: userId
      }, process.env.TOKENKEY, { expiresIn: 1440 });
      // the body to send to front end
      const responseBody = {
        status: 'Success',
        data: {
          message: 'Your are now signed in',
          token,
          userId
        }
      };
      res.status(200).json(responseBody);
    } else {
      res.status(401).json({
        status: 'error',
        error: 'Password does not match'
      });
    }
  });
};

respondersController.fetchAll = (req, res) => {
  RespondersModel.getAll()
    .then((result) => {
      res.status(200).send({ result });
    });
};

export default respondersController;
