const express = require("express");
const {
  addSubCategory,
  deleteSubCategory,
  getSingleSubCat,
  getSubcategory,
  subCategoryByCate,
  updateSubCategory,
} = require("../controllers/subcategoryController");

const router = express.Router();

router.post("/add", addSubCategory);
router.get("/all", getSubcategory);
router.get("/single/:id", getSingleSubCat);
router.get("/:category", subCategoryByCate);
router.put("/update/:id", updateSubCategory);
router.delete("/delete/:id", deleteSubCategory);

module.exports = router;
