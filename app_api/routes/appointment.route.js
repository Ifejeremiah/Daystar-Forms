const { Router } = require('express')
const router = Router()

const { appointment: {
  createNew, getAll, getById,
  removeByEmail, getByEmail, removeById
} } = require('../controllers')

const { appointmentSchema: { createNewSchema, pageSchema } } = require('../schemas')

router.route('/')
  .post(createNewSchema, createNew)
  .get(pageSchema, getAll)

router.route('/:id')
  .get(getById)
  .delete(removeById)

router.route('/email/:email')
  .get(pageSchema, getByEmail)
  .delete(removeByEmail)

module.exports = router