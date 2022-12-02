"use strict";

var mongoose = require("mongoose");

var classSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  price: {
    type: String,
    required: true,
    "default": '10$'
  },
  schedule: [{
    type: Date,
    required: true,
    "default": []
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    "default": []
  }]
});
var classModel = mongoose.model('Class', classSchema);
module.exports = classModel;