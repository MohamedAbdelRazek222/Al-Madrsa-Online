
var roles= require("../../middlewear/authen")
  

var endPoint = {
  class: {
    addClass: [roles.Teacher, roles.Admin]
  },
  admin: {
    getAllAdmins: [roles.Admin],
    editAdmin: [roles.Admin],
    deleteAdmin: [roles.Admin],
    getAllCourses:[roles.Admin,roles.Teacher,roles.Student]
  },
  teacher: {
    getByStdentByTeacher: [roles.Teacher],
    editByStdentByTeacher: [roles.Teacher],
    deleteStdentByTeacher: [roles.Teacher]
  }
};
module.exports = { endPoint};