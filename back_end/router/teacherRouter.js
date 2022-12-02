const {signupTeacher, confirmEmail, signinTeacher, getStudentWithTeacherById, addClassByTeacher, editClassByTeacher, deleteClassByTeacher} = require('../controllers/teacherController')
const { endPoint } = require('../endPoint/endPoint')
const { authen } = require('../middlewear/authen')
const { validation } = require('../middlewear/validation')
const { getAdminValidation, EditByAdminValidation } = require('./VaidationsCruds/adminValidation')

const router = require('express').Router()



router.post('/signupTeacher',signupTeacher)
router.post('/confirmEmail',confirmEmail)
router.post('/signupTeacher',signinTeacher)
router.get('/getStudentWithTeacherById/:id',validation(getAdminValidation),authen(endPoint.admin.getAllAdmins,endPoint.teacher.getByStdentByTeacher),getStudentWithTeacherById)
router.post('/addClassByTeacher',authen(endPoint.admin.getAllAdmins),addClassByTeacher)
router.put('/editClassByTeacher/:id',validation(EditByAdminValidation),authen(endPoint.admin.editAdmin),editClassByTeacher)
router.put('/deleteClassByTeacher/:id',validation(EditByAdminValidation),authen(endPoint.admin.editAdmin),deleteClassByTeacher)







module.exports = router