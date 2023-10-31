const { User } = require('../models');

const createNewUser = ({ displayName, email, password, image }) => {
  try {
    User.create({ displayName, email, password, image });
  } catch (err) {
    console.log(err.message);
  }
};

const readAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  
  return allUsers;
};

const readUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } }); // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findbypk
  return user;
};

const deleteUserById = async (id) => {
  const deleteUser = await User.destroy({ where: { id } });
  return deleteUser;
};
  
module.exports = { 
  createNewUser, 
  readAllUsers,
  readUserById,
  deleteUserById,
};