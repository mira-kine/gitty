const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authenticate, (req, res, next) => {
    Post.getPosts()
      .then((posts) => res.send(posts))
      .catch((error) => next(error));
  })
  .post('/create', authenticate, (req, res, next) => {
    Post.createPost(req.body)
      .then((post) => res.send(post))
      .catch((error) => next(error));
  });
