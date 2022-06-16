const { Router } = require('express')
const router = Router()

const routes = [
  {
    path: '/',
    route: require('./homepage.route')
  }
]

routes.forEach(r => router.use(r.path, r.route))

module.exports = router
