const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const { validateToken } = require('../middlewares/validateToken');

const categoriesRouter = express.Router();

categoriesRouter.post('/', validateToken, categoriesController.createCategory);
categoriesRouter.get('/', validateToken, categoriesController.readAllCategories);

module.exports = categoriesRouter;