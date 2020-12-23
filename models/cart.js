let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// let model = mongoose.model.bind(mongoose);

let cartSchema = new Schema({
  cart: {
    type: Array,
    required: false
  }
});

let Order = mongoose.model('Cart', orderSchema, 'carts');

module.exports = Cart;