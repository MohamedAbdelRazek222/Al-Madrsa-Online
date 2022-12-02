"use strict";

var _require = require('../controllers/teacherController'),
    signupTeacher = _require.signupTeacher,
    confirmEmail = _require.confirmEmail,
    signinTeacher = _require.signinTeacher,
    getStudentWithTeacherById = _require.getStudentWithTeacherById,
    addClassByTeacher = _require.addClassByTeacher,
    editClassByTeacher = _require.editClassByTeacher,
    deleteClassByTeacher = _require.deleteClassByTeacher;

var _require2 = require('../endPoint/endPoint'),
    endPoint = _require2.endPoint;

var _require3 = require('../middlewear/authen'),
    authen = _require3.authen;

var _require4 = require('../middlewear/validation'),
    validation = _require4.validation;

var _require5 = require('./VaidationsCruds/adminValidation'),
    getAdminValidation = _require5.getAdminValidation,
    EditByAdminValidation = _require5.EditByAdminValidation;

var router = require('express').Router();

router.post('/signupTeacher', signupTeacher);
router.post('/confirmEmail', confirmEmail);
router.post('/signupTeacher', signinTeacher);
router.get('/getStudentWithTeacherById/:id', validation(getAdminValidation), authen(endPoint.admin.getAllAdmins, endPoint.teacher.getByStdentByTeacher), getStudentWithTeacherById);
router.post('/addClassByTeacher', authen(endPoint.admin.getAllAdmins), addClassByTeacher);
router.put('/editClassByTeacher/:id', validation(EditByAdminValidation), authen(endPoint.admin.editAdmin), editClassByTeacher);
router.put('/deleteClassByTeacher/:id', validation(EditByAdminValidation), authen(endPoint.admin.editAdmin), deleteClassByTeacher);
module.exports = router;