import * as jwt from 'jsonwebtoken'

/* The middleware to verify a JWT in the request. */
export default function requiresAuthorization (req, res, next) {
  /* The request is expected to have the token in an Authorization header, and is a required item. */
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No credentials sent!' })
  }

  /* Authorization token is formatted as 'Bearer <token>', so split the space to receive the token from it. */
  const authorizationHeader = req.headers.authorization.split(' ')
  const token = authorizationHeader[1]

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      res
      /* 403 Unauthorized */
        .status(403)
        .send({
          error: err,
        })
    }
    if (verified) next()
  })
}
