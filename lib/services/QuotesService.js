const fetch = require('cross-fetch');

module.exports = class Quotes {
  static getQuotes() {
    const quoteArr = [
      'https://futuramaapi.herokuapp.com/api/quotes/1',
      'https://api.quotable.io/random',
      'https://programming-quotes-api.herokuapp.com/quotes/random',
    ];
    const promiseArr = quoteArr.map((api) => fetch(api));

    return Promise.all(promiseArr)
      .then((resp) => {
        return Promise.all(resp.map((item) => item.json()));
      })
      .then((quoteArr) =>
        quoteArr.map((item) => {
          // if successfully matched, return author and quote
          if (item.success) {
            return {
              author: item.contents.quotes[0].author,
              content: item.contents.quotes[0].quote,
            };
            // otherwise, you can match either content or en according to what it is in the API if author matches
          } else if (item.author) {
            return { author: item.author, content: item.content || item.en };
          }
        })
      );
  }
};
