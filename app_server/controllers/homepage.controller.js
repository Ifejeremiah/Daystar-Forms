const fetch = require('node-fetch')
const apiBaseUri = process.env.API_BASE_URI

module.exports = {
  getForms
}


async function getForms(req, res) {
  const response = await fetch(`${apiBaseUri}/forms`)
  const data = await response.json()
  res.render('homepage', data)
}