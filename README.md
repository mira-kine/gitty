# Plan for Gitty

- [x] sql table for github_users
- [x] set up app.js
- [x] npm i needed packages

## Users can sign up using their Github account

- [x] GET /api/v1/github/login route (for redirecting to Github’s OAuth)
- i.e. if no GithubUser exists in your database for the user, create a new one

## Users can sign in using their Github account

- i.e. if an existing GithubUser exists for a given email address, don’t create a new user, but use the existing one for generating the JWT to save into the cookie
- [x] GET /api/v1/github/login/callback callback URI for Github to redirect to after log in

## Authenticated users can view a list of text posts (via API)

- i.e. the /api/v1/posts route uses Express middleware for authentication
- [ ] authentication middleware
- [ ] GET '/api/v1/posts' -> lists posts for all users

## Authenticated users can make short text posts (via API)

- [ ] limit text posts to 255 characters (in sql)

## Authenticated users can make subsequent requests to the API without having to log in before each one

- i.e. your authentication process uses cookies to store server-side state
- [x] GithubUser model
- [ ] Post model

## Signs user out

- [x] DELETE /api/v1/github signs a user out (i.e. deletes the session cookie)
- [x] gitHub utils -> exchangeCodeForToken , getGitHubProfile
