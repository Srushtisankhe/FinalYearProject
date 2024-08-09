const medicineModel = require("../models/medicineModel");


// Create a new medicine
const getCreateMedicine = async (name, dosage, frequency) => {
    try {
        const medicine = new medicineModel({ name, dosage, frequency });
        const newMedicine = await medicine.save();
        return newMedicine;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get all medicines
const getAllMedicine = async () => {
    try {
        const medicines = await medicineModel.find();
        return medicines;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Get a single medicine by ID
const getMedicineById = async (medicineId) => {
    try {
        const medicine = await medicineModel.findById(medicineId);
        if (!medicine) {
            throw new Error('Medicine not found');
        }
        return medicine;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Update a medicine by ID
const getUpdateMedicine = async (medicineId, name, dosage, frequency) => {
    try {
        const updatedMedicine = await medicineModel.findByIdAndUpdate(
            medicineId,
            { name, dosage, frequency },
            { new: true }
        );
        if (!updatedMedicine) {
            throw new Error('Medicine not found');
        }
        return updatedMedicine;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Delete a medicine by ID
const getDeleteMedicine = async (medicineId) => {
    try {
        const deletedMedicine = await medicineModel.findByIdAndDelete(medicineId);
        if (!deletedMedicine) {
            throw new Error('Medicine not found');
        }
        return { message: 'Medicine deleted successfully' };
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
  getAllMedicine,
  getCreateMedicine,
  getMedicineById,
  getUpdateMedicine,
  getDeleteMedicine,
}
