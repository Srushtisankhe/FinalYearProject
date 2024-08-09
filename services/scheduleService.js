const Schedule = require('../models/scheduleModel');

// Function to create a new schedule
const createSchedule = async (scheduleData) => {
    try {
        const newSchedule = await Schedule.create(scheduleData);
        return newSchedule;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to retrieve all schedules
const getAllSchedules = async () => {
    try {
        const allSchedules = await Schedule.find();
        return allSchedules;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to retrieve a single schedule by ID
const getScheduleById = async (scheduleId) => {
    try {
        const schedule = await Schedule.findById(scheduleId);
        return schedule;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to update a schedule by ID
const updateSchedule = async (scheduleId, updatedData) => {
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, updatedData, { new: true });
        return updatedSchedule;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to delete a schedule by ID
const deleteSchedule = async (scheduleId) => {
    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(scheduleId);
        return deletedSchedule;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule
};
