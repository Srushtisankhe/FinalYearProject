const mongoose = require("mongoose");
const Category = require("./categoryModel");

const { Schema } = mongoose;

const subCateSchema = new Schema({
  subname: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Category,
  },
  description: {
    type: String,
  },
});

const SubCategorySchema = mongoose.model("SubCategorySchema", subCateSchema);

module.exports = SubCategorySchema;
