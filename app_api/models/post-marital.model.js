const { Schema, default: mongoose } = require('mongoose')
const aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const schema = new Schema({
  brother: {
    email: { type: String, required: true, lowercase: true },
    name: String,
    age: Number,
    dateOfSalvation: Date,
    isCompletedDaystarAcademy: Boolean,
    daystarLevelCompleted: String,
    isBaptised: Boolean,
    dateOfBaptism: Date,
    homeAddress: String,
    occupation: String,
    phoneNumber: Number,
    officeNumber: String,
    needCounselIn: { type: Array, default: [] }
  },
  sister: {
    email: { type: String, required: true, lowercase: true },
    name: String,
    age: Number,
    dateOfSalvation: Date,
    isCompletedDaystarAcademy: Boolean,
    daystarLevelCompleted: String,
    isBaptised: Boolean,
    dateOfBaptism: Date,
    homeAddress: String,
    occupation: String,
    phoneNumber: Number,
    officeNumber: String,
    needCounselIn: { type: Array, default: [] }
  },
  lengthOfMarriage: Number,
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

module.exports = mongoose.model('PostMarital', schema)