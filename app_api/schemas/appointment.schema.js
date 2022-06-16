const Joi = require('@hapi/joi')
const { validateRequest: { validateBody, validateQuery } } = require('../_middlewares')

module.exports = { createNewSchema, pageSchema }

function createNewSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    fullName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    purposeOfAppointment: Joi.string().required(),
    dateOfVisit: Joi.date().required(),
    organisation: Joi.string().required(),
    address: Joi.string().required(),
  });
  validateBody(req, next, schema);
}

function pageSchema(req, res, next) {
  const schema = Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required(),
  });
  validateQuery(req, next, schema);
}