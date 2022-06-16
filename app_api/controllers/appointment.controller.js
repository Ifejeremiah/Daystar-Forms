const { Responses: { successResponse: success } } = require('../_middlewares')
const { appointment } = require('../services')

module.exports = {
  createNew, getAll, getById,
  getByEmail, removeById, removeByEmail
}

function createNew(req, res, next) {
  appointment.createNew(req.body)
    .then(data => success(res, 'Appointment application created successfully', data, 201))
    .catch(next)
}

function getAll(req, res, next) {
  appointment.getAll(req.query)
    .then(data => success(res, 'Appointment applications fetched successfully', data))
    .catch(next)
}

function getById(req, res, next) {
  appointment.getById(req.params.id)
    .then(data => success(res, 'Appointment application fetched by ID successfully', data))
    .catch(next)
}

function getByEmail(req, res, next) {
  const { page, limit } = req.query, { email } = req.params
  appointment.getByEmail(page, limit, email)
    .then(data => success(res, 'Appointment application fetched by email successfully', data))
    .catch(next)
}

function removeById(req, res, next) {
  appointment.deleteById(req.params.id)
    .then(data => success(res, 'Appointment application deleted by ID successfully', data))
    .catch(next)
}

function removeByEmail(req, res, next) {
  appointment.deleteByEmail(req.params.email)
    .then(data => success(res, 'Appointment application deleted by email successfully', data))
    .catch(next)
}