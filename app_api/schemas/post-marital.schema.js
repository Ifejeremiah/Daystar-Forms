const Joi = require('@hapi/joi')
const { validateRequest: { validateBody, validateQuery } } = require('../_middlewares')

module.exports = { createNewSchema, pageSchema }

function createNewSchema(req, res, next) {
  const schema = Joi.object({
    brotherEmail: Joi.string().email().lowercase().required(),
    sisterEmail: Joi.string().email().lowercase().required(),
    brotherName: Joi.string().required(),
    sisterName: Joi.string().required(),
    brotherAge: Joi.number().required(),
    sisterAge: Joi.number().required(),
    lengthOfMarriage: Joi.number().required(),
    brotherDateOfSalvation: Joi.date().required(),
    sisterDateOfSalvation: Joi.date().required(),
    brotherIsCompletedDaystarAcademy: Joi.boolean().required(),
    sisterIsCompletedDaystarAcademy: Joi.boolean().required(),
    brotherDaystarLevelCompleted: Joi.string(),
    sisterDaystarLevelCompleted: Joi.string(),
    brotherIsBaptised: Joi.boolean().required(),
    sisterIsBaptised: Joi.boolean().required(),
    brotherDateOfBaptism: Joi.date(),
    sisterDateOfBaptism: Joi.date(),
    brotherHomeAddress: Joi.string().required(),
    sisterHomeAddress: Joi.string().required(),
    brotherOccupation: Joi.string().required(),
    sisterOccupation: Joi.string().required(),
    brotherPhoneNumber: Joi.number().required(),
    sisterPhoneNumber: Joi.number().required(),
    brotherOfficeNumber: Joi.number(),
    sisterOfficeNumber: Joi.number(),
    brotherNeedCounselIn: Joi.string(),
    sisterNeedCounselIn: Joi.string(),
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