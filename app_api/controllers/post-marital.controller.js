const { Responses: { successResponse: success } } = require('../_middlewares')
const { postMarital } = require('../services')

module.exports = {
  createNew, getAll, getById,
  getByEmail, removeById, removeByEmail
}

function createNew(req, res, next) {
  postMarital.createNew(req.body)
    .then(data => success(res, 'Post Marital application created successfully', data, 201))
    .catch(next)
}

function getAll(req, res, next) {
  postMarital.getAll(req.query)
    .then(data => success(res, 'Post Marital applications fetched successfully', data))
    .catch(next)
}

function getById(req, res, next) {
  postMarital.getById(req.params.id)
    .then(data => success(res, 'Post Marital application fetched by ID successfully', data))
    .catch(next)
}

function getByEmail(req, res, next) {
  const { page, limit } = req.query, { email } = req.params
  postMarital.getByEmail(page, limit, email)
    .then(data => success(res, 'Post Marital application fetched by email successfully', data))
    .catch(next)
}

function removeById(req, res, next) {
  postMarital.deleteById(req.params.id)
    .then(data => success(res, 'Post Marital application deleted by ID successfully', data))
    .catch(next)
}

function removeByEmail(req, res, next) {
  postMarital.deleteByEmail(req.params.email)
    .then(data => success(res, 'Post Marital application deleted by email successfully', data))
    .catch(next)
}