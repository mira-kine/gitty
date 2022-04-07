const { Router } = require('express');
const jwt = require('jsonwebtoken');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`
    );
  })
  .get('/login/callback', (req, res, next) => {
    const { code } = req.query;
    let user;
    exchangeCodeForToken(code)
      .then((token) => getGithubProfile(token))
      .then(({ login, avatar_url, email }) =>
        GithubUser.findByUsername(login).then((ghUser) => {
          if (ghUser) {
            user = ghUser;
          } else {
            GithubUser.insert({
              username: login,
              avatar: avatar_url,
              email,
            }).then((createdUser) => (user = createdUser));
          }
        })
      )
      .then(() => {
        const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, {
          expiresIn: '1 day',
        });
        res
          .cookie(process.env.COOKIE_NAME, payload, {
            httpOnly: true,
            maxAge: ONE_DAY_IN_MS,
          })
          .redirect('/api/v1/posts');
      })
      .catch((error) => next(error));
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ message: 'Signed out successfully' });
  });
