const Joi = require('@hapi/joi')
const { validateRequest: { validateBody, validateQuery } } = require('../_middlewares')

module.exports = { createNewSchema, pageSchema }

function createNewSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    fatherName: Joi.string().required(),
    motherName: Joi.string().required(),
    phoneNumbers: Joi.string().required(),
    address: Joi.string().required(),
    cellLeader: Joi.string().required(),
    districPastor: Joi.string().required(),
    parentsSignature: Joi.string(),
    dob: Joi.date().required(),
    gender: Joi.string().required(),
    placeOfBirth: Joi.string(),
    childNames: Joi.string(),
    isTwins: Joi.boolean(),
    namesOfTwins: Joi.string(),
    dateOfNaming: Joi.date().required(),
    dateOfDedication: Joi.date(),
    isMember: Joi.boolean().required(),
    isZoneCordinator: Joi.boolean(),
    isAreaCordinator: Joi.boolean(),
    isHeadOfUnit: Joi.boolean(),
    isCellLeader: Joi.boolean(),
    isAssistCellLeader: Joi.boolean(),
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