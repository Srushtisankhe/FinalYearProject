const express = require('express');
const { getAlltestBooking, getCreateTestBooking,  getDeleteTestBooking, getUpdateTestBooking,  } = require('../controllers/testBookingController');

const router = express.Router();

router.get('/alltestBooking', getAlltestBooking);

router.post('/addtestBooking', getCreateTestBooking);

router.put('/update/:test_id', getUpdateTestBooking);

router.delete('/delete/:test_id', getDeleteTestBooking);

module.exports = router;
