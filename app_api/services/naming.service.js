const { db, paginate, build } = require('../_config')

module.exports = {
  createNew, getAll, getById,
  getByEmail, deleteById, deleteByEmail
}

async function createNew(body) {
  const { email,
    fatherName,
    motherName,
    phoneNumbers,
    address,
    cellLeader,
    districPastor,
    parentsSignature,
    dob,
    gender,
    placeOfBirth,
    childNames,
    isTwins,
    namesOfTwins,
    dateOfNaming,
    dateOfDedication,
    isMember,
    isZoneCordinator,
    isAreaCordinator,
    isHeadOfUnit,
    isAssistCellLeader,
    isCellLeader } = body

  const createBody = {
    email,
    parents: {
      fatherName,
      motherName,
      address,
      cellLeader,
      districPastor,
      mobileNumbers: phoneNumbers ? phoneNumbers.split(',') : null,
      signatures: parentsSignature ? parentsSignature.split(',') : null,
    },
    child: {
      dob,
      names: childNames ? childNames.split(',') : null,
      namesOfTwins: namesOfTwins ? namesOfTwins.split(',') : null,
      isTwins,
      placeOfBirth,
      dateOfNaming,
      dateOfDedication,
      gender
    },
    church: {
      isMember,
      isZoneCordinator,
      isAreaCordinator,
      isHeadOfUnit,
      isAssistCellLeader,
      isCellLeader
    }
  }

  return await db.Naming.create(createBody)
}

async function getAll({ page, limit }) {
  const naming = await paginate(db.Naming, {}, page, limit)
  return await build(naming, format)
}

async function getById(id) {
  const naming = await getNaming(id)
  return format(naming)
}

async function getByEmail(page, limit, email) {
  const naming = await paginate(db.Naming, { email }, page, limit)
  return await build(naming, format)
}

async function deleteById(id) {
  const naming = await getNaming(id)
  await naming.remove()
  return naming
}

async function deleteByEmail(email) {
  await getNamingByEmail({ email })
  await db.Naming.deleteMany({ email })
}

async function getNaming(id) {
  if (!db.isValidId(id)) throw 'Invalid Child Naming ID'
  const naming = await db.Naming.findById(id)
  if (!naming) throw 'Naming application not found'
  return naming
}

async function getNamingByEmail(email) {
  const naming = await db.Naming.findOne(email)
  if (!naming) throw 'Child Naming application with email not found'
  return naming
}

function format(body) {
  // const { _id: id, email, fullName, phoneNumber,
  //   purposeOfNaming, dateOfVisit,
  //   organisation, address, status } = body
  // return {
  //   id, email, fullName, phoneNumber,
  //   purposeOfNaming, dateOfVisit,
  //   organisation, address, status
  // }
  return body
}