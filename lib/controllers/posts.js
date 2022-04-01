const { Router } = require('express');

module.exports = Router().get('/', async (req, res, next) => {
  const post = [
    { id: '1', text: 'this is my test post' },
    {
      id: '2',
      text: 'this is my second test post',
    },
  ];
  res.send(post);
});
