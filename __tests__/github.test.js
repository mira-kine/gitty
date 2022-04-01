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

  it('redirects to github oauth page after login', async () => {
    const req = await request(app).get('/api/v1/github/login');
    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('logs user in and redirects to posts page', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);
    // check that callback redirects you to posts
    // check for res.redirects, make sure it matches to what you want to redirect to
    expect(req.redirects[0]).toEqual(expect.stringContaining('/api/v1/posts'));
  });

  it('signs out user through a delete route', async () => {
    await GithubUser.insert({
      username: 'fake_github_user',
      avatar: 'https://www.placecage.com/gif/300/300',
      email: 'not-real@example.com',
    });

    const res = await request(app).delete('/api/v1/login/callback');
    expect(res.body).toEqual({
      message: 'Signed out successfully',
      success: true,
    });
  });
});
