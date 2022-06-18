const { db, paginate, build } = require('../_config')

module.exports = {
  createNew, getAll, getById,
  getByEmail, deleteById, deleteByEmail
}

async function createNew(body) {
  const {
    brotherEmail,
    sisterEmail,
    brotherName,
    sisterName,
    brotherAge,
    sisterAge,
    lengthOfMarriage,
    brotherDateOfSalvation,
    sisterDateOfSalvation,
    brotherIsCompletedDaystarAcademy,
    sisterIsCompletedDaystarAcademy,
    brotherDaystarLevelCompleted,
    sisterDaystarLevelCompleted,
    brotherIsBaptised,
    sisterIsBaptised,
    brotherDateOfBaptism,
    sisterDateOfBaptism,
    brotherHomeAddress,
    sisterHomeAddress,
    brotherOccupation,
    sisterOccupation,
    brotherPhoneNumber,
    sisterPhoneNumber,
    brotherOfficeNumber,
    sisterOfficeNumber,
    brotherNeedCounselIn,
    sisterNeedCounselIn,
  } = body

  const postBody = {
    brother: {
      email: brotherEmail,
      name: brotherName,
      age: brotherAge,
      dateOfSalvation: brotherDateOfSalvation,
      isCompletedDaystarAcademy: brotherIsCompletedDaystarAcademy,
      daystarLevelCompleted: brotherDaystarLevelCompleted,
      isBaptised: brotherIsBaptised,
      dateOfBaptism: brotherDateOfBaptism,
      homeAddress: brotherHomeAddress,
      occupation: brotherOccupation,
      phoneNumber: brotherPhoneNumber,
      officeNumber: brotherOfficeNumber,
      needCounselIn: brotherNeedCounselIn ? brotherNeedCounselIn.split(',') : null
    },
    sister: {
      email: sisterEmail,
      name: sisterName,
      age: sisterAge,
      dateOfSalvation: sisterDateOfSalvation,
      isCompletedDaystarAcademy: sisterIsCompletedDaystarAcademy,
      daystarLevelCompleted: sisterDaystarLevelCompleted,
      isBaptised: sisterIsBaptised,
      dateOfBaptism: sisterDateOfBaptism,
      homeAddress: sisterHomeAddress,
      occupation: sisterOccupation,
      phoneNumber: sisterPhoneNumber,
      officeNumber: sisterOfficeNumber,
      needCounselIn: sisterNeedCounselIn ? sisterNeedCounselIn.split(',') : null
    },
    lengthOfMarriage
  }

  return await db.PostMarital.create(postBody)
}

async function getAll({ page, limit }) {
  const postMarital = await paginate(db.PostMarital, {}, page, limit)
  return await build(postMarital, format)
}

async function getById(id) {
  const postMarital = await getPostMarital(id)
  return format(postMarital)
}

async function getByEmail(page, limit, email) {
  await getPostMaritalByEmail(email)

  let postMarital = await paginate(db.PostMarital, { 'brother.email': email }, page, limit)
  if (!postMarital.docs.length) postMarital = await paginate(db.PostMarital, { 'sister.email': email }, page, limit)

  return await build(postMarital, format)
}

async function deleteById(id) {
  const postMarital = await getPostMarital(id)
  await postMarital.remove()
  return postMarital
}

async function deleteByEmail(email) {
  await getPostMaritalByEmail(email)
  await db.PostMarital.deleteMany({ 'brother.email': email })
  await db.PostMarital.deleteMany({ 'sister.email': email })
}

async function getPostMarital(id) {
  if (!db.isValidId(id)) throw 'Invalid post-marital ID'
  const postMarital = await db.PostMarital.findById(id)
  if (!postMarital) throw 'Post-marital application not found'
  return postMarital
}

async function getPostMaritalByEmail(email) {
  let postMarital = await db.PostMarital.findOne({ 'brother.email': email })
  if (!postMarital) {
    postMarital = await db.PostMarital.findOne({ 'sister.email': email })
  }

  if (!postMarital) throw 'Post-marital application with email not found'
  return postMarital
}

function format(body) {
  return body
}
