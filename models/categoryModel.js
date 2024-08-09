const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    categoryDescription: {
        type: String,
        required: true
    },
    categoryImage: String,
    visible: {
        type: Boolean,
        default: true
    }
},{timestamps:true});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
