const { Responses: { successResponse: success } } = require('../_middlewares')
const { facility } = require('../services')

module.exports = {
  createNew, getAll, getById,
  getByEmail, removeById, removeByEmail
}

function createNew(req, res, next) {
  facility.createNew(req.body)
    .then(data => success(res, 'Facility application created successfully', data, 201))
    .catch(next)
}

function getAll(req, res, next) {
  facility.getAll(req.query)
    .then(data => success(res, 'Facility applications fetched successfully', data))
    .catch(next)
}

function getById(req, res, next) {
  facility.getById(req.params.id)
    .then(data => success(res, 'Facility application fetched by ID successfully', data))
    .catch(next)
}

function getByEmail(req, res, next) {
  const { page, limit } = req.query, { email } = req.params
  facility.getByEmail(page, limit, email)
    .then(data => success(res, 'Facility application fetched by email successfully', data))
    .catch(next)
}

function removeById(req, res, next) {
  facility.deleteById(req.params.id)
    .then(data => success(res, 'Facility application deleted by ID successfully', data))
    .catch(next)
}

function removeByEmail(req, res, next) {
  facility.deleteByEmail(req.params.email)
    .then(data => success(res, 'Facility application deleted by email successfully', data))
    .catch(next)
}