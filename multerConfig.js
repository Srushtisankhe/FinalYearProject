const multer = require("multer")

const getFileExtension = (filename) => {
  return "." + filename.split(".").pop();
};

// multer configuration for product images
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    const productNameWords = req.body.productName.split(" ");
    const productNewName = productNameWords.slice(0, 2).join("-");
    const uniqueSuffix = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const filename = `${productNewName}-${uniqueSuffix}${getFileExtension(file.originalname)}`;
    cb(null, filename);
  },
});


// multer configuration for category images
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/categories");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + getFileExtension(file.originalname)
    );
  },
});

const prescriptionStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/prescriptions");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const filename = `${uniqueSuffix}${getFileExtension(file.originalname)}`;
    cb(null, filename);
  },
});

// Initialize multer instance for prescription uploads
const prescriptionUpload = multer({ storage: prescriptionStorage });

// Initialize multer instances for product and category uploads
const productUpload = multer({ storage: productStorage });
const categoryUpload = multer({ storage: categoryStorage });

module.exports = { productUpload, categoryUpload , prescriptionUpload};
