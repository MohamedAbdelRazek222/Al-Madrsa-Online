const express = require('express');
const   attendenceController = require('../controllers/attendanceController');
const attendrouter = express.Router();

// attendrouter.route('/').get(attendenceController.getAllreports)
attendrouter.route('/').post(attendenceController.creatReport);
attendrouter.route('/').get(attendenceController.getAllreports);
attendrouter.route('/:id').get(attendenceController.getReport).put(attendenceController.editReport).delete(attendenceController.deleteReport);


  attendrouter.get('*', (req, res) => {
    res.status(404).json({
      message: `${req.originalUrl} not found`,
    });
  
    const err = new Error(`${req.originalUrl} not found`);
    err.statusCode = 404;
  });

module.exports = attendrouter;
