"use strict";

var mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
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
  student_subjects: [{
    // بتاعه المواد id واخد ال 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],
  role: {
    type: String,
    "default": 'student'
  }
});
var studentModel = mongoose.model('Student', studentSchema);
module.exports = studentModel;
/*

student -> [class]
class -> [students]

create student class: [] -- has id
create class student: [] -- has id

subject:
["teacher"]

cl
fetch student id - 
fetch class id

student.classes.push("class_id")
class.student.push("student_id")

"->" means refer to:

subject -> teacher:
getById(subjectid, SubjectModel, ["teacher"])

teacher -> subject
getById(teacherId, TeacherModel, ["subject"])

teacher -> [subjects]
getById(teacherId, TeacherModel, ["subjects"])

*/