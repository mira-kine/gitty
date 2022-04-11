const { Router } = require('express');
const Quotes = require('../services/QuotesService');

module.exports = Router().get('/', (req, res, next) => {
  return Quotes.getQuotes()
    .then((quotes) => res.send(quotes))
    .catch((error) => next(error));
});
