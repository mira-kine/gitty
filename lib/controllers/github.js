const { Router } = require('express');
const fetch = require('cross-fetch');
const { exchangeCodeForToken } = require('../utils/github');

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
    const profile = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token: ${token}`,
      },
    });
    // if existing user, then get
    // if no user, create one
    // create jwt using JWT_SECRET
    // set cookie
    // redirect to posts
  });
