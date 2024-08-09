const express = require("express");
const {
  addToCart,
  getCart,
  updateCart,
  removeCart,
} = require("../controllers/cartController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.post("/add",authenticate, addToCart);
router.get("/:userId", getCart);
router.put("/update/:id",authenticate, updateCart);
router.delete("/remove/:id",authenticate, removeCart);

module.exports = router;
