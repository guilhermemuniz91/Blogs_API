const jwt = require('jsonwebtoken');

const secretToken = process.env.JWT_SECRET || 'notSoSecretToken';

const validateToken = (req, res, next) => {
  try {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
      return res.status(401).json({ message: 'Token not found' });
    }
    
    const extractToken = bearerToken.split(' ')[1];

    const payload = jwt.verify(extractToken, secretToken);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { validateToken };