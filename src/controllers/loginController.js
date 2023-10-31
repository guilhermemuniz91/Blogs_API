const jwt = require('jsonwebtoken');
const { readEmailAndPassword } = require('../services/loginServices');

const secretToken = process.env.JWT_SECRET || 'notSoSecretToken';

const validateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
  
    const user = await readEmailAndPassword({ email, password });
    if (!user) return res.status(400).json({ message: 'Invalid fields' });

    const payload = {
      email,
      admin: false,
    };
    const token = jwt.sign(payload, secretToken, { expiresIn: '2h', algorithm: 'HS256' });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = { 
  validateLogin, 
};