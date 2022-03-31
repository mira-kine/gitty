const { Router } = require('express');
const fetch = require('cross-fetch');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`
    );
  })
  .get('/login/callback', async (req, res) => {
    // get code
    const { code } = req.query;
    // exchange the code for token
    const token = await exchangeCodeForToken(code);
    // get info from gh about user token
    const { login, avatar_url, email } = await getGithubProfile(token);
    // if existing user, then get user
    const user = await {
      username: login,
      email,
      avatar: avatar_url,
    };
    return user;
    // if no user, create one
    // create jwt using JWT_SECRET
    // set cookie
    // redirect to posts
  });
