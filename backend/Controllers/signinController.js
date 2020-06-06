import jwt from 'jsonwebtoken';
import encoder from '../utility/passwordEnc';
// import database method for saving user
import userModel from '../Models/userModel';

const signinController = (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(400).json({
      status: 'error',
      error: 'Email and password field cannot be empty'
    });
    return;
  }
  userModel.findOne(email).then((result) => {
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
          userId,
          userName: result.name
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

export default signinController;
