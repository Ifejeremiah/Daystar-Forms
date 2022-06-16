const Joi = require('@hapi/joi')
const { validateRequest: { validateBody, validateQuery } } = require('../_middlewares')

module.exports = { createNewSchema, pageSchema }

function createNewSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    fullName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    purposeOfUse: Joi.string().required(),
    dateOfEvent: Joi.date().required(),
    hallOfUse: Joi.string().required(),
    nameOfUnit: Joi.string().required(),
    equipments: Joi.string().required(),
    numberOfGuests: Joi.number().required(),
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