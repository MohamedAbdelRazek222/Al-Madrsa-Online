"use strict";

var mongoose = require("mongoose");

var adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmEmail: {
    type: Boolean,
    "default": false
  },
  role: {
    type: String,
    "default": 'admin'
  }
});
var adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;