const mongoose = require("mongoose");
const Category = require("./categoryModel");
const SubCategorySchema = require("./subcategoryModel");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      maxlength: 256,
    },
    productSku: {
      type: String,
      maxlength: 256,
    },
    description: {
      type: String,
    },
    shortDesc: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SubCategorySchema,
    },
    variations: [
      {
        item: Number,
        units: {
          type: String,
        },
        itemQuantity: {
          type: Number,
          min: 1,
          max: 99999,
        },
        power: {
          type: String,
        },
        stock: {
          type: Boolean,
          default: true,
        },
        price: {
          type: Number,
          // required: true,
          min: 0,
          max: 9999999999,
        },
        productImage: {
          type: Array,
        },
      },
    ],
    proStatus: {
      type: String,
    },
    discount: {
      type: Number,
    },
    proTag: {
      type: [String],
    },
    manufacturerName: {
      type: String,
    },
    manufacturerLocation: {
      type: String,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
