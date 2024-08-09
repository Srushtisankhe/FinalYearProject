const express = require("express");
const {
  addProduct,
  getVisibleProducts,
  searchProducts,
  singleProduct,
  filterMedicineNames,
  getProByCategory,
} = require("../controllers/productController");

const router = express.Router();

router.post("/add", addProduct);
router.get("", getVisibleProducts);
router.get("/search", searchProducts);
router.get("/:id",singleProduct);
router.post("/scanmedicine", filterMedicineNames);
router.get("/category/:category",getProByCategory);

module.exports = router