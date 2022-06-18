const { Router } = require('express')
const router = Router()

const routes = [
  {
    route: '/facilities',
    path: require('./facility.route')
  },
  {
    route: '/appointments',
    path: require('./appointment.route')
  },
  {
    route: '/child-naming',
    path: require('./naming.route')
  },
  {
    route: '/post-marital',
    path: require('./post-marital.route')
  }
]

routes.forEach(x => router.use(x.route, x.path))

module.exports = router
