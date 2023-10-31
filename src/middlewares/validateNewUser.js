const { User } = require('../models');

const displayNameValidation = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const emailValidation = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  const readEmail = await User.findOne({ where: { email } });
  if (readEmail) return res.status(409).json({ message: 'User already registered' }); 
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

module.exports = { 
  displayNameValidation, 
  emailValidation, 
  passwordValidation, 
};