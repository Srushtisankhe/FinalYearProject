const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testBookingSchema = new Schema({
    patientName: {
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const testBookingModel = mongoose.model("TestBooking", testBookingSchema);
module.exports = testBookingModel;