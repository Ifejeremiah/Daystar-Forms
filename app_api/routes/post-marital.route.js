const { Router } = require('express')
const router = Router()

const { postMarital: {
  createNew, getAll, getById,
  removeByEmail, getByEmail, removeById
} } = require('../controllers')

const { postMaritalSchema: { createNewSchema, pageSchema } } = require('../schemas')

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