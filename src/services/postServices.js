const { Op } = require('sequelize');
const { BlogPost, 
  PostCategory, 
  User, 
  Category } = require('../models');

const createPost = async ({ title, content, categoryIds, userId }) => {
  const newPost = await BlogPost.create({
    title,
    content,
    userId,
  });

  categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({
      postId: newPost.id,
      categoryId,
    });
  });

  return newPost;
};

const readAllPosts = async () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const readPostById = async (id) => {
  const post = await BlogPost.findByPk(id, { include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories' }] });
  return post;
};

const updatePostById = async (id, data) => {
  const updatePost = await BlogPost.update(data, { where: { id } });
  return updatePost;
};

const deletePostById = async (id) => {
  const deletePost = await BlogPost.destroy({ where: { id } });
  return deletePost;
};

const readPostByQuery = async (q) => BlogPost.findAll({
  where: { 
    [Op.or]: [
      { title: { [Op.like]: `%${q}%` } },
      { content: { [Op.like]: `%${q}%` } },
    ],
  },
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

module.exports = {
  createPost,
  readAllPosts,
  readPostById,
  updatePostById,
  deletePostById,
  readPostByQuery,
};