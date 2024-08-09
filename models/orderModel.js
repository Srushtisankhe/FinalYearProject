const mongoose = require('mongoose');
const Products = require('./productModel');
const userModel = require('./userModel');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Products,
    required: true
  }],
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  phoneNumber: {
    type: String,
    // required: true
  },
  shippingAddress: {
    type: String,
    // required: true
  },
  prescriptionFile: String, // Store file path or URL
  paymentType: {
    type: String,
    // required: true
  },
  totalAmount: {
    type: Number,
    // required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing' ,'completed'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
