const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('gets list of quotes from an array of APIs', async () => {
    // objects of author: and content:
    const expected = [
      {
        author: expect.any(String),
        content: expect.any(String),
      },
      {
        author: expect.any(String),
        content: expect.any(String),
      },
      {
        author: expect.any(String),
        content: expect.any(String),
      },
    ];
    const res = await request(app).get('/api/v1/quotes');
    expect(res.body).toEqual(expected);
  });
});
