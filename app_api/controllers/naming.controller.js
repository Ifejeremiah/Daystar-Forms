const { Responses: { successResponse: success } } = require('../_middlewares')
const { naming } = require('../services')

module.exports = {
  createNew, getAll, getById,
  getByEmail, removeById, removeByEmail
}

function createNew(req, res, next) {
  naming.createNew(req.body)
    .then(data => success(res, 'Child Naming application created successfully', data, 201))
    .catch(next)
}

function getAll(req, res, next) {
  naming.getAll(req.query)
    .then(data => success(res, 'Child Naming applications fetched successfully', data))
    .catch(next)
}

function getById(req, res, next) {
  naming.getById(req.params.id)
    .then(data => success(res, 'Child Naming application fetched by ID successfully', data))
    .catch(next)
}

function getByEmail(req, res, next) {
  const { page, limit } = req.query, { email } = req.params
  naming.getByEmail(page, limit, email)
    .then(data => success(res, 'Child Naming application fetched by email successfully', data))
    .catch(next)
}

function removeById(req, res, next) {
  naming.deleteById(req.params.id)
    .then(data => success(res, 'Child Naming application deleted by ID successfully', data))
    .catch(next)
}

function removeByEmail(req, res, next) {
  naming.deleteByEmail(req.params.email)
    .then(data => success(res, 'Child Naming application deleted by email successfully', data))
    .catch(next)
}