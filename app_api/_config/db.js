const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

mongoose.Promise = global.Promise;

module.exports = {
  Facility: require('../models/facility.model'),
  Appointment: require('../models/appointment.model'),
  Naming: require('../models/naming.model'),
  isValidId
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}