const express = require('express');
const userController = require('../controllers/userController');
const { 
  displayNameValidation, 
  emailValidation, 
  passwordValidation } = require('../middlewares/validateNewUser');
const { validateToken } = require('../middlewares/validateToken');

const userRouter = express.Router();

userRouter.post(
  '/',
  displayNameValidation, 
  emailValidation, 
  passwordValidation, 
  userController.createNewUser,
);
userRouter.get('/', validateToken, userController.readAllUsers);
// userRouter.get('/:id', validateToken, userController.readUserById);
// userRouter.delete(
//   '/me',
//   validateToken, 
//   userController.deleteUserById,
// );

module.exports = userRouter;