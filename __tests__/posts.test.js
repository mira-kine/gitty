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

  it('user can get posts after redirect from oauth', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login');
    // call back redirect, exchange access_token
    await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);
    // posts
    const post1 = {
      id: expect.any(String),
      text: 'my first text post!',
    };

    const post2 = {
      id: expect.any(String),
      text: 'my second text post!',
    };

    const res = await agent.get('/api/v1/posts');

    expect(res.body).toEqual([post1, post2]);
  });

  // it('user can create short 255 char post if signed in', async () => {
  //   const agent = request.agent(app);
  //   const loginReq = await request
  //     .agent(app)
  //     .get('/api/v1/github/login/callback?code=42')
  //     .redirects(1);
  //   // sign in gitHub user
  //   // mocks give fake token
  //   const callbackRes = await agent.get('/login/callback');

  //   const res = await agent.post('/api/v1/posts/create').send({
  //     text: 'this is my test post',
  //   });
  //   expect(res.body).toEqual({
  //     id: expect.any(String),
  //     text: 'this is my test post',
  //   });
  // });
});
