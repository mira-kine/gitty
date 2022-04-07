const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
  // { access_token } = code;
  fetch('https://github.com/login/oauth/access_token', {
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
  }).then(({ access_token }) => resp.json());
  // return access_token;
};

const getGithubProfile = async (token) => {
  const profileRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token: ${token}`,
    },
  });
  const { avatar_url, login } = await profileRes.json();
  return { username: login, photoUrl: avatar_url };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
