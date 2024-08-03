// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: { 
    type: String, 
    required: true 
  },
  category_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true },
  category_type: { 
    type: String, 
    required: true 
  },
  order_description: { 
    type: String, 
    required: true 
  },
  order_status: { 
    type: String, 
    enum: ['pending', 'started', 'completed', 'rejected'], 
    required: true 
  },
  order_createdAt: { 
    type: Date, 
    default: Date.now 
  },
  order_completedAt: { 
    type: Date 
  },
});

module.exports = mongoose.model('Order', OrderSchema);
