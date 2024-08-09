// controllers/testBookingController.js

const TestBooking = require('../models/TestBooking');

// Controller function to get all test bookings
const getAllTestBookings = async (req, res) => {
  try {
    const testBookings = await TestBooking.find();
    res.json({ testBookings });
  } catch (error) {
    console.error('Error getting test bookings:', error);
    res.status(500).json({ message: 'Failed to get test bookings' });
  }
};

// Controller function to create a new test booking
const createTestBooking = async (req, res) => {
  try {
    const newTestBooking = await TestBooking.create(req.body);
    res.status(201).json({ testBooking: newTestBooking });
  } catch (error) {
    console.error('Error creating test booking:', error);
    res.status(500).json({ message: 'Failed to create test booking' });
  }
};

// Controller function to update a test booking by ID
const updateTestBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTestBooking = await TestBooking.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTestBooking) {
      return res.status(404).json({ message: 'Test booking not found' });
    }
    res.json({ testBooking: updatedTestBooking });
  } catch (error) {
    console.error('Error updating test booking:', error);
    res.status(500).json({ message: 'Failed to update test booking' });
  }
};

// Controller function to delete a test booking by ID
const deleteTestBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTestBooking = await TestBooking.findByIdAndDelete(id);
    if (!deletedTestBooking) {
      return res.status(404).json({ message: 'Test booking not found' });
    }
    res.json({ message: 'Test booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting test booking:', error);
    res.status(500).json({ message: 'Failed to delete test booking' });
  }
};

module.exports = {
  getAllTestBookings,
  createTestBooking,
  updateTestBooking,
  deleteTestBooking
};
