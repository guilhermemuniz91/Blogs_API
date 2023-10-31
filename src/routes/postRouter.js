const express = require('express');
const postController = require('../controllers/postController');
const { validateToken } = require('../middlewares/validateToken');
const { validateFields, 
  validateCategoryIds } = require('../middlewares/validateNewPost');
// const { validateUpdate } = require('../middlewares/validateUpdate');
// const validatePostDeletion = require('../middlewares/validatePostDeletion');
// const { validateAuthorPost } = require('../middlewares/validateAuthorPost');

const postRouter = express.Router();

postRouter.post(
  '/', 
  validateToken, 
  validateFields, 
  validateCategoryIds,
  postController.createPost,
);

postRouter.get(
  '/search',
  validateToken,
  postController.readPostByQuery,
);

postRouter.get(
  '/',
  validateToken,
  postController.readAllPosts,
);

postRouter.get(
  '/:id',
  validateToken,
  postController.readPostById,
);

// postRouter.put(
//   '/:id',
//   validateToken,
//   validateUpdate,
//   // validateAuthorPost,
//   postController.updatePostById,
// );

// postRouter.delete(
//   '/:id',
//   validateToken,
//   validatePostDeletion,
//   postController.deletePostById,
// );

module.exports = postRouter;