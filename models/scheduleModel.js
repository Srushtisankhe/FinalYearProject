const mongoose = require('mongoose');
const userModel = require('./userModel');

const medicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:userModel,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  times: [{
    time: String,
    period: String,
    relation: String
  }],
  startDate: Date,
  endDate: Date,
  note: String
});

const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication;
