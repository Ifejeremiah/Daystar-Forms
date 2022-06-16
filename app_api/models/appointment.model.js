const { Schema, default: mongoose } = require('mongoose')
const aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const schema = new Schema({
  email: { type: String, required: true, lowercase: true },
  fullName: String,
  organisation: String,
  phoneNumber: Number,
  purposeOfAppointment: String,
  dateOfVisit: Date,
  address: String,
  status: { type: String, enum: ['approved', 'declined', 'pending'], default: 'pending' }
}, { timestamps: true })

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  }
})

schema.plugin(aggregatePaginate)

module.exports = mongoose.model('Appointment', schema)