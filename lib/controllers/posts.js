const { Router } = require('express');
const Post = require('../models/Post');

module.exports = Router().get('/', async (req, res) => {
  const post = await Post.getPosts();
  res.send(post);
});
