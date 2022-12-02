const { signupAdmin, confirmEmail, refreshEmail, signinAdmin, getAllAdmin, getAdminById, addTeacher, addStudent, addClass, editTeacher, editClass, editStudent, deleteTeacher, getAllTeachers, getTeacherById, getAllStudents, getStudentById, getAllClasses, getClassById, deleteStudent, deleteClass, getAllParents, addParent, Enroll, EnrollClass, editEnrollStudent } = require('../controllers/adminController');
const { signUpValidation, getAdminValidation, EditByAdminValidation, DeleteByAdminValidation } = require('./VaidationsCruds/adminValidation');
const { endPoint } = require('../endPoint/endPoint');
const { authen } = require('../middlewear/authen');
const { validation } = require('../middlewear/validation');



const router=require('express').Router();


router.post('/signupAdmin',validation(signUpValidation),signupAdmin)
router.post('/signinAdmin',signinAdmin)
router.get('/confirmEmail/:token',confirmEmail)
router.get('/refreshEmail/:token',refreshEmail)
router.get('/getAllAdmin',getAllAdmin)
router.get('/getAdminById/:id',validation(getAdminValidation),authen(endPoint.admin.getAllAdmins),getAdminById)
router.post('/addTeacher',addTeacher)
router.post('/addStudent',addStudent)
router.post('/addParent',addParent)
router.post('/addClass',addClass)
router.put('/editTeacher/:id',validation(EditByAdminValidation),editTeacher)
router.put('/editStudent/:id',validation(EditByAdminValidation),editStudent)
router.put('/editEnrollStudent/:id',editEnrollStudent)
router.put('/editClass/:id',editClass)
router.put('/EnrollClass/:id',EnrollClass)
router.delete('/deleteTeacher/:id',validation(DeleteByAdminValidation),deleteTeacher)
router.delete('/deleteStudent/:id',validation(DeleteByAdminValidation),deleteStudent)
router.delete('/deleteClass/:id',validation(DeleteByAdminValidation),deleteClass)
router.get('/getAllTeachers',getAllTeachers)
router.get('/getAllParents',getAllParents)
router.get('/getTeacherById/:id',validation(getAdminValidation),getTeacherById)
router.get('/getAllStudents',getAllStudents)
router.get('/getStudentById/:id',validation(getAdminValidation),getStudentById)
router.get('/getAllClasses',getAllClasses)
router.get('/getClassById/:id',validation(getAdminValidation),getClassById)


module.exports =router

