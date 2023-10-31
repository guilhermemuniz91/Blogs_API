const categoriesServices = require('../services/categoriesServices');

const validateFields = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds || categoryIds.length === 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  const allCategoryIds = await categoriesServices.readAllCategories(categoryIds);
  if (categoryIds.length !== allCategoryIds.count) {
    return res.status(400).json({
      message: 'one or more "categoryIds" not found',
    });
  }
  next();
};

module.exports = { 
  validateFields, 
  validateCategoryIds, 
};

// const validateNewPost = async (req, res, next) => {
//   const { title, content, categoryIds } = req.body;
//   if (!title || !content || !categoryIds) {
//     return res.status(400).json({ message: 'Some required fields are missing' });
//   }

//   const categories = await categoriesServices.readAllCategories();
//   const idList = categories.map(({ id }) => id);

//   if (!categoryIds.every((category) => idList.includes(category))) {
//     return res.status(400).json({ message: 'one or more "categoryIds" not found' });
//   }
//   next();
// };

// module.exports = { validateNewPost };