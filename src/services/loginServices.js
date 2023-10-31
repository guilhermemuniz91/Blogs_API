const { User } = require('../models');

const readEmailAndPassword = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: { email, password } }); // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findone
    return user;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  readEmailAndPassword,
};