const express = require('express');
const { createMedication, getAllMedications, updateMedication, deleteMedication } = require('../controllers/scheduleController');
const router = express.Router();

router.post('/:userId/medications', createMedication);

router.get('/:userId/medications', getAllMedications);

router.put('/:userId/medications/:id', updateMedication);

router.delete('/:userId/medications/:id', deleteMedication);

module.exports = router;
