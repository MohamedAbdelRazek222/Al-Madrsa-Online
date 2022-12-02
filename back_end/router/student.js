const express = require('express');
const   adminController = require('../controllers/adminController');
const studentrouter = express.Router();

// studentrouter.route('/').get(adminController.getAllreports)
// studentrouter.route('/').post(adminController.creatReport);
// studentrouter.route('/:classId').get(adminController.Enroll)
// .putEnroll(adminController.EnrollEdit).deleteEnroll(adminController.deleteEnroll);


  studentrouter.get('*', (req, res) => {
    res.status(404).json({
      message: `${req.originalUrl} not found`,
    });
  
    const err = new Error(`${req.originalUrl} not found`);
    err.statusCode = 404;
  });

module.exports = studentrouter;
