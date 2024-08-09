const {
  activeCategories,
  addCategory,
  deleteCategory,
  getallCategories,
  singleCategory,
  updateCategory,
} = require("../controllers/categoryController");

const express = require("express");

const router = express.Router();
// admin
router.post("/add", addCategory);
router.get("/all", getallCategories);
router.get("/single/:id", singleCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

// user
router.get("/", activeCategories);

module.exports = router;
