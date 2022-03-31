const { Router } = require('express');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`
    );
  })
  .get('/login/callback', async (req, res) => {
    // get code
    // exchange for token
    // get info from gh about user token
    // if existing user, then get
    // if no user, create one
    // create jwt using JWT_SECRET
    // set cookie
    // redirect to posts
  });
