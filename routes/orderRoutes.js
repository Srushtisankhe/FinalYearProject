const express  = require('express');
const { orderNow, getOrder } = require('../controllers/orderController');
const router = express.Router();


router.post("/process",orderNow)
router.get("/:userId", getOrder);

module.exports = router