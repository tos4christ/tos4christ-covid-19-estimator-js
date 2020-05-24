import jwt from 'jsonwebtoken';

const jwtCheck = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      status: 'error',
      error: 'Unauthorized access, you need to be logged in as a registered user'
    });
    return;
  }
  if (req.headers.authorization) {
    const requestToken = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
    jwt.verify(requestToken, process.env.TOKENKEY, (err, tokens) => {
      if (err) {
        res.status(401).json({
          status: 'error',
          error: err.message
        });
      }
      if (!tokens) {
        res.status(410).json({
          status: 'error',
          error: 'You are not properly authorized'
        });
      }
      if (tokens) {
        next();
      }
    });
  }
};

export default jwtCheck;
