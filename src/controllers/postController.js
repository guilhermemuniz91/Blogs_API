const postServices = require('../services/postServices');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.payload.data;
    const newPost = await postServices.createPost(title, content, categoryIds, id);
  
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: 'internal error', error: error.message });
  }
};

const readAllPosts = async (_req, res) => {
  try {
    console.log('oi');
    const allPosts = await postServices.readAllPosts();
    console.log(allPosts);
    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(500).json({ message: 'internal error', error: error.message });
  }
};

const readPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postServices.readPostById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
};

const updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    await postServices.updatePostById(id, { title, content });
    const updatedPost = await postServices.readPostById(id);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: 'internal error', error: error.message });
  }
};

const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    await postServices.deletePostById(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const readPostByQuery = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await postServices.readPostByQuery(q);
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  readAllPosts,
  readPostById,
  updatePostById,
  deletePostById,
  readPostByQuery,
};