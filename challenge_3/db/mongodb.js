const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schema
var CheckoutModelSchema = new Schema({
  Name: String,
  Email: String,
  Password: String,
  Address: {
    Line_1: String,
    Line_2: String,
    City: String,
    State: String,
    Zipcode: Number
  },
  'Phone Number': Number,
  'Credit Card': Number,
  'Expiration Date': Number,
  CVV: Number,
  'Billing Zipcode': Number

});

var CheckoutModel = mongoose.model('CheckoutModel', CheckoutModelSchema);

module.exports = CheckoutModel;