const { Schema, default: mongoose } = require('mongoose')
const aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const schema = new Schema({
  email: { type: String, required: true, lowercase: true },
  parents: {
    fatherName: String,
    motherName: String,
    mobileNumbers: Array,
    address: String,
    cellLeader: String,
    districPastor: String,
    signatures: { type: Array, default: [] }
  },
  child: {
    names: Array,
    isTwins: { type: Boolean, default: false },
    namesOfTwins: Array,
    dob: Date,
    gender: { type: String, enum: ['male', 'female'] },
    placeOfBirth: String,
    dateOfNaming: Date,
    dateOfDedication: Date,
  },
  church: {
    isMember: Boolean,
    isZoneCordinator: Boolean,
    isAreaCordinator: Boolean,
    isHeadOfUnit: Boolean,
    isCellLeader: Boolean,
    isAssistCellLeader: Boolean,
  },
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

module.exports = mongoose.model('Naming', schema)