let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: {createdAt: "created_at"}});

let Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;