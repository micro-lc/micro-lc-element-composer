module.exports = (req, res) => {
  res.type('application/javascript').sendFile('lodash-test.js', {root: './mock-server/api/v1/microlc/configuration/lodash-test'})
}
