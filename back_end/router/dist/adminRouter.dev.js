"use strict";

var _require = require('../controllers/adminController'),
    signupAdmin = _require.signupAdmin,
    confirmEmail = _require.confirmEmail,
    refreshEmail = _require.refreshEmail,
    signinAdmin = _require.signinAdmin,
    getAllAdmin = _require.getAllAdmin,
    getAdminById = _require.getAdminById,
    addTeacher = _require.addTeacher,
    addStudent = _require.addStudent,
    addClass = _require.addClass,
    editTeacher = _require.editTeacher,
    editClass = _require.editClass,
    editStudent = _require.editStudent,
    deleteTeacher = _require.deleteTeacher;

var _require2 = require('./VaidationsCruds/adminValidation'),
    signUpValidation = _require2.signUpValidation,
    getAdminValidation = _require2.getAdminValidation,
    EditByAdminValidation = _require2.EditByAdminValidation,
    DeleteByAdminValidation = _require2.DeleteByAdminValidation;

var _require3 = require('../endPoint/endPoint'),
    endPoint = _require3.endPoint;

var _require4 = require('../middlewear/authen'),
    authen = _require4.authen;

var _require5 = require('../middlewear/validation'),
    validation = _require5.validation;

var router = require('express').Router();

router.post('/signupAdmin', validation(signUpValidation), signupAdmin);
router.post('/signinAdmin', signinAdmin);
router.get('/confirmEmail/:token', confirmEmail);
router.get('/refreshEmail/:token', refreshEmail);
router.get('/getAllAdmin', authen(endPoint.admin.getAllAdmins), getAllAdmin);
router.get('/getAdminById/:id', validation(getAdminValidation), authen(endPoint.admin.getAllAdmins), getAdminById);
router.post('/addTeacher', authen(endPoint.admin.getAllAdmins), addTeacher);
router.post('/addStudent', authen(endPoint.admin.getAllAdmins), addStudent);
router.post('/addClass', authen(endPoint.admin.getAllAdmins), addClass);
router.put('/editTeacher/:id', validation(EditByAdminValidation), authen(endPoint.admin.editAdmin), editTeacher);
router.put('/editStudent/:id', validation(EditByAdminValidation), authen(endPoint.admin.editAdmin), editStudent);
router.put('/editClass/:id', validation(EditByAdminValidation), authen(endPoint.admin.editAdmin), editClass);
router["delete"]('/deleteTeacher/:id', validation(DeleteByAdminValidation), authen(endPoint.admin.deleteAdmin), deleteTeacher);
module.exports = router;