const { db, paginate, build } = require('../_config')

module.exports = {
  createNew, getAll, getById,
  getByEmail, deleteById, deleteByEmail
}

async function createNew(body) {
  body.equipments = body.equipments.split(',')
  return await db.Facility.create(body)
}

async function getAll({ page, limit }) {
  const facility = await paginate(db.Facility, {}, page, limit)
  return await build(facility, format)
}

async function getById(id) {
  const facility = await getFacility(id)
  return format(facility)
}

async function getByEmail(page, limit, email) {
  const facility = await paginate(db.Facility, { email }, page, limit)
  return await build(facility, format)
}

async function deleteById(id) {
  const facility = await getFacility(id)
  await facility.remove()
  return facility
}

async function deleteByEmail(email) {
  await getFacilityByEmail({ email })
  await db.Facility.deleteMany({ email })
}

async function getFacility(id) {
  if (!db.isValidId(id)) throw 'Invalid facility ID'
  const facility = await db.Facility.findById(id)
  if (!facility) throw 'Facility application not found'
  return facility
}

async function getFacilityByEmail(email) {
  const facility = await db.Facility.findOne(email)
  if (!facility) throw 'Facility application with email not found'
  return facility
}

function format(body) {
  const { id, email, fullName, phoneNumber,
    purposeOfUse, dateOfEvent, hallOfUse,
    nameOfUnit, equipments, timeOfEvent,
    numberOfGuests, status } = body
  return {
    id, email, fullName, phoneNumber,
    purposeOfUse, dateOfEvent, hallOfUse,
    nameOfUnit, equipments, timeOfEvent,
    numberOfGuests, status
  }
}
