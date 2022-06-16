const { db, paginate, build } = require('../_config')

module.exports = {
  createNew, getAll, getById,
  getByEmail, deleteById, deleteByEmail
}

async function createNew(body) {
  return await db.Appointment.create(body)
}

async function getAll({ page, limit }) {
  const appoint = await paginate(db.Appointment, {}, page, limit)
  return await build(appoint, format)
}

async function getById(id) {
  const appoint = await getAppointment(id)
  return format(appoint)
}

async function getByEmail(page, limit, email) {
  const appoint = await paginate(db.Appointment, { email }, page, limit)
  return await build(appoint, format)
}

async function deleteById(id) {
  const appoint = await getAppointment(id)
  await appoint.remove()
  return appoint
}

async function deleteByEmail(email) {
  await getAppointmentByEmail({ email })
  await db.Appointment.deleteMany({ email })
}

async function getAppointment(id) {
  if (!db.isValidId(id)) throw 'Invalid appointment ID'
  const appoint = await db.Appointment.findById(id)
  if (!appoint) throw 'Appointment application not found'
  return appoint
}

async function getAppointmentByEmail(email) {
  const appoint = await db.Appointment.findOne(email)
  if (!appoint) throw 'Appointment application with email not found'
  return appoint
}

function format(body) {
  const { _id: id, email, fullName, phoneNumber,
    purposeOfAppointment, dateOfVisit,
    organisation, address, status } = body
  return {
    id, email, fullName, phoneNumber,
    purposeOfAppointment, dateOfVisit,
    organisation, address, status
  }
}