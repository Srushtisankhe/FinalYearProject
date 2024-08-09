const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true,
      },
      match: /.+\@.+\..+/,
      maxlength: 256,
    },
    password: {
      type: String,
      required:true
    },
    contact: {
      type: Number,
      // required:true
    },
    role: {
      type: String,
      enum: ["user", "admin", "subadmin"],
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
