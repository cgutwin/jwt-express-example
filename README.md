# JSON Web Tokens with Express

Just a small example on how to implement JSON Web Token signing and verification with an Express server.

Useful for routes where you require a user to be authorized to access the content.

## Demo

I currently have setup a functional demo to try out requesting a token, and to use the token for access to a route.

You can only access it through CURL, or requests made in something like [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest). I guess you could use your browser to modify requests &mdash; Firefox Dev is good with this.

### Endpoints

These are formatted for curl, but you are able to import directly into Postman.

#### Token Retrieval

```shell
curl -X POST
  https://api.cgutwin.ca/jsonwebtoken/v1/auth
  -H 'Accept: */*'
  -H 'Cache-Control: no-cache'
  -H 'Connection: keep-alive'
  -H 'Content-Type: application/json'
  -H 'Host: api.cgutwin.ca'
  -H 'accept-encoding: gzip, deflate'
  -H 'cache-control: no-cache'
  -H 'content-length: 62'
  -d '{
    "username": "a_username",
    "password": "a_password"
}'
```

#### Protected Route Access

Take the JWT you received in the request above, and paste it in this request.

```shell
curl -X GET
  https://api.cgutwin.ca/jsonwebtoken/v1/protected
  -H 'Accept: */*'
  -H 'Authorization: Bearer <JSON_WEB_TOKEN>'
  -H 'Cache-Control: no-cache'
  -H 'Connection: keep-alive'
  -H 'Content-Type: application/json'
  -H 'Host: api.cgutwin.ca'
  -H 'accept-encoding: gzip, deflate'
  -H 'cache-control: no-cache'
```

## Source Setup

Clone the repository and `pnpm install` (or `npm i` or `yarn`).

`index.js` and the routes are located in `/lib`, but you can run directly with `pnpm run start`.

#### Environment

These are the environment variables the server looks for:

```
NODE_ENV=development
PORT=10000
JWT_SECRET='secret'
SSL_ROOT='config/ssl'
SSL_CERT_NAME='localhost-cert.pem'
SSL_KEY_NAME='localhost-privkey.pem'
```
Create a `.env` file in the root, change the secret, and configure paths to your localhost SSL configuration. I put copies of my SSL cert and key in a `config/ssl` folder for easy access, but you can put an absolute path as the root.

