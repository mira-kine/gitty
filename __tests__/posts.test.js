const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');

jest.mock('../lib/utils/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('user can create short 255 char post if signed in', async () => {
    const agent = request.agent(app);
    // sign in gitHub user
    await GithubUser.insert({
      username: 'fake_github_user',
      avatar: 'https://www.placecage.com/gif/300/300',
      email: 'not-real@example.com',
    });
    await agent.get('/login/callback');

    const res = await agent.post('/api/v1/posts/create').send({
      text: 'this is my test post',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      text: 'this is my test post',
    });
  });
});
