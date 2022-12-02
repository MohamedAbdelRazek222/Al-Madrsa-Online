const mongoose = require("mongoose");
const teacherModel = require("./teacher");
const classSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  teacher: {   //د ا الشخص الي كريته
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    default: null
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
    required: true,
    default: '10$'
  },
  level: {
    type: String,
    required: true,
    default: '1st level'
  },
  Image_url: {
    type: String,
    default: 'https://1.bp.blogspot.com/-ugf3uhhQYH8/X-xIJ-2TVtI/AAAAAAAAB1M/OCAGWmXvjbcTcqZQuNMjhA1TNCDTdhaaACLcBGAsYHQ/s450/Online_English_Courses_Learn_Special_English.jpg'
  },
  slots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      default: []
    }
  ],
  schedule: [
    {
      type: Date,
      default: []
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: []
    }
  ],

});
classSchema.post('findByIdAndDelete', function (doc) {
  teacherModel.findOneAndUpdate({ subject: doc._id }, { $set: { subject: null } })
});
const classModel = mongoose.model('Class', classSchema)
module.exports = classModel
