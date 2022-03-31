const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`
    );
  })
  .get('/login/callback', async (req, res, next) => {
    // get code
    const { code } = req.query;
    // exchange the code for token
    const token = await exchangeCodeForToken(code);
    // get info from gh about user token
    const { login, avatar_url, email } = await getGithubProfile(token);
    // if existing user, then get user
    let user = await GithubUser.findByUsername(login);
    // if no user, create one
    if (!user) {
      user = await GithubUser.insert({
        username: login,
        avatar: avatar_url,
        email,
      });
    }
    // create jwt using JWT_SECRET
    const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
    // set payload to cookie
    try {
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        // redirect to posts
        .redirect('/api/v1/posts');
    } catch (error) {
      next(error);
    }
  });
