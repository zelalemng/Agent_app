// models/Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category_Name: { 
    type: String, 
    required: true 
  },
  category_description: { 
    type: String, 
    required: true 
  },
  category_status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    required: true },
  category_createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
