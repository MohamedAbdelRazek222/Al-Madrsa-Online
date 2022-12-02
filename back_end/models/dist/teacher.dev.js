"use strict";

var mongoose = require("mongoose");

var teacherSchema = mongoose.Schema({
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
  code: {
    type: String,
    "default": ' '
  },
  DOB: {
    type: Date
  },
  gender: {
    type: String,
    "enum": ['male', 'female'],
    "default": 'male'
  },
  phone: {
    type: String
  },
  teacher_subjects: {
    // بتاعه الماده id واخد ال 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  confirmEmail: {
    type: Boolean,
    "default": false
  },
  role: {
    type: String,
    "default": 'teacher'
  }
});
var teacherModel = mongoose.model('Teacher', teacherSchema);
module.exports = teacherModel;