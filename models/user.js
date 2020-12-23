let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
    }
  ]
}, { timestamps: {createdAt: "created_at"}});

let User = mongoose.model('User', userSchema, 'users');

module.exports = User;