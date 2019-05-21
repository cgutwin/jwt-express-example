import * as jwt from 'jsonwebtoken'

export function Login (req, res) {
  const data = req.body

  /*
  * Generally, the username/password validation will check based on hashes in the database, but for this example
  * just check that the values exist in the request.
  *
  * Always make sure you're sending sensitive information over an HTTPS connection.
  * */
  if (!data.username || !data.password) {
    res
      .status(400)
      .send({
        "route": "auth",
        "error": "Missing username or password from request."
      })
  }

  /*
  * Use the user's data in here as the payload, but don't use sensitive information. This is for authorization, not
  * authentication.
  *
  * Useful for the username, adding a userid (most likely from the database), and maybe some groups for route
  * permissions.
  * */
  const payload = {
    username: req.body.username,
    id: Math.floor(Math.random() * Math.floor(1000))
  }

  jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: '1h',
  }, (err, token) => {
    if (err) console.error(err)
    res
      .status(200)
      .send({
        "route": "auth",
        "token": token
      })
  })
}
