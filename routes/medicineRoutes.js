
const express = require('express');
const { getAllMedicine, getCreateMedicine, getMedicineById, getUpdateMedicine, getDeleteMedicine } = require('../controllers/medicineController');
const router = express.Router();

router.get('/allmedicine', getAllMedicine);
router.post('/addmedicine', getCreateMedicine);
router.get('/single/:medicine_id', getMedicineById);
router.put('/update/:medicine_id', getUpdateMedicine);
router.delete('/delete/:medicine_id', getDeleteMedicine);

module.exports = router;
