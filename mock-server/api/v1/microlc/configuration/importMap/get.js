const importMap = {
  "imports": {
    "lodash": "https://unpkg.com/lodash@4.17.21/lodash.js"
  }
}

module.exports = (request, response) => {
  response
    .delay(1000)
    .send(importMap)
}
