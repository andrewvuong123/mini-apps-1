const mongoose = require('mongoose');
// checkout is db name

// define schema
var CheckoutSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  line_1: String,
  line_2: String,
  city: String,
  state: String,
  zipcode: Number,
  phone: Number,
  credit: Number,
  expiry: Number,
  cvv: Number,
  zip: Number
});

var Checkout = mongoose.model('Checkout', CheckoutSchema);

module.exports = Checkout;
