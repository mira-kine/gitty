const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const post = await Post.getPosts();
    res.send(post);
  } catch (error) {
    next(error);
  }
});
