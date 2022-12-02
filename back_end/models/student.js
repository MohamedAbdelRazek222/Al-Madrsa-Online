const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  },
  phone: {
    type: String
  },
  level:{
    type:String,
    required:true,
    default:'1st Elementary level'
    },
  Parent : {
    type:mongoose.Schema.Types.ObjectId ,
    ref: 'Parent',
    default : null 
  },
  subjects: [{ // بتاعه المواد id واخد ال 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],
  role: {
    type: String,
    default: 'student'
  },
  profile_image:{
    type: String,
    default:"https://th.bing.com/th/id/R.6652f3c2e0d15e58a2df0a4652bfa19b?rik=uQPa1KGpBV2jgw&pid=ImgRaw&r=0"
  }
});

const StudentModel = mongoose.model("Student", studentSchema);

module.exports = StudentModel





// student -> [class]
// class -> [students]

// create student class: [] -- has id
// create class student: [] -- has id

// subject:
// ["teacher"]

// cl
// fetch student id - 
// fetch class id

// student.classes.push("class_id")
// class.student.push("student_id")

// "->" means refer to:

// subject -> teacher:
// getById(subjectid, SubjectModel, ["teacher"])

// teacher -> subject
// getById(teacherId, TeacherModel, ["subject"])

// teacher -> [subjects]
// getById(teacherId, TeacherModel, ["subjects"])


