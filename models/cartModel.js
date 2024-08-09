const mongoose = require("mongoose");
const Products = require("./productModel");
const userModel = require("./userModel");

const { Schema } = mongoose;

const cartSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Products,
        required: true,
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      power:{
        type:String,
      },
      units:{
        type:String,
      },
      price: {
        type: Number,
      },
})

const Cart = mongoose.model( "Cart", cartSchema );
module.exports=Cart;