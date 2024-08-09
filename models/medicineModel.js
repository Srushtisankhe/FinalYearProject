const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dosage: {
    type: String
  },
  frequency: {
    type: String
  },

});

const medicineModel = mongoose.model('Medicine', medicineSchema);
module.exports = medicineModel
