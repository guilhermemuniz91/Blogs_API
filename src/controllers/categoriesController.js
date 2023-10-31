const categoriesServices = require('../services/categoriesServices');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await categoriesServices.createCategory(name);

    if (!newCategory || !newCategory.name) {
      return res.status(400).json({ message: '"name" is required' });
    }

    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: 'internal error', error: error.message });
  }
};

const readAllCategories = async (_req, res) => {
  const categories = await categoriesServices.readAllCategories();
  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  readAllCategories,
};