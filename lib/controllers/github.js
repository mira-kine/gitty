const { Router } = require('express');
const fetch = require('cross-fetch');

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
    await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      }),
    });
    // parse the access_token

    // get info from gh about user token
    // if existing user, then get
    // if no user, create one
    // create jwt using JWT_SECRET
    // set cookie
    // redirect to posts
  });
