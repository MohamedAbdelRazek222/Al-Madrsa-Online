"use strict";

var jwt = require('jsonwebtoken');

var adminModel = require('../models/admin');

var studentModel = require('../models/student');

var teacherModel = require('../models/teacher');

var _require = require('../utils/crud'),
    get = _require.get,
    getById = _require.getById;

var roles = {
  Admin: 'admin',
  Teacher: 'teacher',
  Student: 'student'
};

var authen = function authen(accessRoles) {
  return function _callee(req, res, next) {
    var headerToken, token, decoded, userId, findUser, findUser2, findUser3, foundUser;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            headerToken = req.headers['authorization']; // if(!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith(`${process.env.TOKEN} `)){

            if (headerToken.startsWith("Bearer ")) {
              _context.next = 5;
              break;
            }

            res.status(400).json({
              message: "invalid header token"
            });
            _context.next = 27;
            break;

          case 5:
            token = headerToken.split(' ')[1]; //  jwt.sign({userId:user._id},prpcess.env.LOGINTOKEN)

            _context.prev = 6;
            decoded = jwt.verify(token, process.env.LOGINTOKEN); // token  فكلي ال 

            if (!decoded) {
              res.status(400).json({
                message: "invalid  token"
              });
            }

            userId = decoded.id;
            _context.next = 12;
            return regeneratorRuntime.awrap(getById(userId, teacherModel, []));

          case 12:
            findUser = _context.sent;
            _context.next = 15;
            return regeneratorRuntime.awrap(getById(userId, studentModel, []));

          case 15:
            findUser2 = _context.sent;
            _context.next = 18;
            return regeneratorRuntime.awrap(getById(userId, adminModel, []));

          case 18:
            findUser3 = _context.sent;
            foundUser = [findUser2, findUser, findUser3].find(function (user) {
              return user;
            });

            if (!foundUser) {
              res.status(404).json({
                message: "user not found"
              });
            } else {
              if (!accessRoles.includes(foundUser.role)) {
                res.status(401).json({
                  message: 'not auth account'
                });
              } else {
                req.user = findUser;
                next();
              }
            }

            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0); //

            res.status(400).json({
              message: "invalid  token 2"
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[6, 23]]);
  };
};

module.exports = {
  authen: authen,
  roles: roles
};
/*

                const foundUser = [findUser2, findUser, findUser3]

const sa = foundUser.filter((s)=>{
    if (s !== null){

        console.log(s)
        return s
    }
    
})
console.log(sa[0])

                if (sa[0] == null || sa[0]=='undefined' ) { 
                    res.status(404).json({
                        message: "user not found"
                    })
                } else {
                  
                    if (!accessRoles.includes(sa[0].role)) {
                        res.json({ message:'not auth account'})
                    } else {
                        console.log("assasasaxasxaxax")
                        req.user = sa[0]
                       console.log("assasasaxasxaxax")

                        next()
                        console.log("assasasaxasxaxax")

                    }




*/