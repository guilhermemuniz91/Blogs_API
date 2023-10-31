const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const secretToken = process.env.JWT_SECRET || 'notSoSecretToken';

const createNewUser = (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    userServices.createNewUser({ displayName, email, password, image });
    const payload = {
      email,
      admin: false,
    };
    const token = jwt.sign(payload, secretToken, { expiresIn: '7d', algorithm: 'HS256' });
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const readAllUsers = async (_req, res) => {
  try {
    const allUsers = await userServices.readAllUsers();
    return res.status(200).json(allUsers);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const readUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userServices.readUserById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.user;
  try {
    await userServices.deleteUserById(id);
    res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: console.log({ id }) });
  }
};

module.exports = { 
  createNewUser,
  readAllUsers,
  readUserById,
  deleteUserById,
};