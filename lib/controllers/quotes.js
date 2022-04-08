const { Router } = require('express');
const Quotes = require('../services/QuotesService');

module.exports = Router().get('/', async (req, res, next) => {
  Quotes.getQuotes()
    .then((quotes) => res.send(quotes))
    .catch((error) => next(error));
});
