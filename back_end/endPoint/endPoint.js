const {
    roles
} = require("../middlewear/authen");

const endPoint = {
    class: {

        addClass: [roles.Teacher, roles.Admin]
    },
    admin: {
        getAllAdmins: [roles.Admin],
        editAdmin: [roles.Admin],
        deleteAdmin: [roles.Admin],
        adminAllCourses: [roles.Admin, roles.Teacher, roles.Student],


    },
    teacher: {
        getByStdentByTeacher: [roles.Teacher],
        editByStdentByTeacher: [roles.Teacher],
        deleteStdentByTeacher: [roles.Teacher],


    },
    slot: {
        allroles: [roles.Admin, roles.Teacher, roles.Student],
        updateOperations: [roles.Teacher]
    }



}

module.exports = {
    endPoint
}