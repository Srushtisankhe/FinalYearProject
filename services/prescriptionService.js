const Prescription = require("../models/prescriptionModel");


// Create a new prescription
const createPrescription = async (userId, prescriptionImage, medicines) => {
    try {
        const prescription = new Prescription({
            userId,
            prescriptionImage,
            medicines
        });
        const newPrescription = await prescription.save();
        return newPrescription;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get all prescriptions
const getAllPrescriptions = async () => {
    try {
        const prescriptions = await Prescription.find();
        return prescriptions;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a single prescription by ID
const getPrescriptionById = async (prescriptionId) => {
    try {
        const prescription = await Prescription.findById(prescriptionId);
        if (!prescription) {
            throw new Error('Prescription not found');
        }
        return prescription;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update a prescription by ID
const updatePrescription = async (prescriptionId, updateData) => {
    try {
        const prescription = await Prescription.findByIdAndUpdate(
            prescriptionId,
            updateData,
            { new: true }
        );
        if (!prescription) {
            throw new Error('Prescription not found');
        }
        return prescription;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Delete a prescription by ID
const deletePrescription = async (prescriptionId) => {
    try {
        const prescription = await Prescription.findByIdAndDelete(prescriptionId);
        if (!prescription) {
            throw new Error('Prescription not found');
        }
        return { message: 'Prescription deleted successfully' };
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    createPrescription,
    getAllPrescriptions,
    getPrescriptionById,
    updatePrescription,
    deletePrescription
}
