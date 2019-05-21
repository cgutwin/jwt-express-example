export function Protected (req, res) {
  /* Do what you want in here to return data for the protected route. */
  res
    .status(200)
    .send({
      "route": "protected"
    })
}
