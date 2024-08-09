const express = require('express');
const { createPrescription, getAllPrescriptions, getPrescriptionById, updatePrescription, deletePrescription } = require('../controllers/prescriptionController');
const router = express.Router();

router.post('/addprescription', createPrescription);


router.get('/allprescription', getAllPrescriptions);


router.get('/single/:id', getPrescriptionById);


router.put('/update/:medicine_id', updatePrescription);


router.delete('/delete/:id', deletePrescription);

module.exports = router;
