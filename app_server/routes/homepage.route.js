const { Router } = require('express')
const router = Router()

const { homepage } = require('../controllers')

router.get('/', homepage.getForms)

module.exports = router
