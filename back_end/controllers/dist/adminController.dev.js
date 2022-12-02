"use strict";

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var adminModel = require("../models/admin");

var sendEmail = require("../service/email.service");

var signupAdmin = function signupAdmin(req, res) {
  var _req$body, name, email, password, hashPassword, newadmin, savedadmin, token, link, link2;

  return regeneratorRuntime.async(function signupAdmin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.hash(password, parseInt(process.env.SALTROUNDS)));

        case 3:
          hashPassword = _context.sent;
          newadmin = new adminModel({
            name: name,
            email: email,
            password: hashPassword
          });
          _context.next = 7;
          return regeneratorRuntime.awrap(newadmin.save());

        case 7:
          savedadmin = _context.sent;
          token = jwt.sign({
            id: savedadmin._id
          }, process.env.EMAILTOKEN, {
            expiresIn: '1h'
          });
          link = "".concat(req.protocol, "://").concat(req.headers.host, "/admin/confirmEmail/").concat(token);
          link2 = "".concat(req.protocol, "://").concat(req.headers.host, "/admin/").concat(savedadmin._id);
          message = "<a href=".concat(link, ">please click to confirm Email<a/> <br>\n           <a href='").concat(link2, "'>re-send conFirm Email</a>\n"); // sendEmail(savedadmin.email, message)

          res.status(201).json({
            message: "done",
            savedadmin: savedadmin
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}; // REFRESH EMAIL------------------------------------------------


var refreshEmail = function refreshEmail(req, res) {
  var id, admin, token, link, link2;
  return regeneratorRuntime.async(function refreshEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(adminModel.findById(id).select('confirmEmail email'));

        case 4:
          admin = _context2.sent;

          if (!admin) {
            res.status(404).json({
              message: 'invalid account'
            });
          } else {
            if (admin.confirmEmail) {
              res.status(400).json({
                message: 'Email is Already Confirmed'
              });
            } else {
              token = jwt.sign({
                id: admin._id
              }, process.env.EMAILTOKEN, {
                expiresIn: '1h'
              });
              link = "".concat(req.protocol, "://").concat(req.headers.host, "/admin/confirmEmail/").concat(token);
              link2 = "".concat(req.protocol, "://").concat(req.headers.host, "/admin/refreshEmail/").concat(admin._id);
              message = "<a href=".concat(link, ">please click to confirm Email<a/> <br>\n                       <a href='").concat(link2, "'>re-send conFirm Email</a>\n            ");
              sendEmail(admin.email, message);
              res.status(209).json({
                message: 'plaese check your Email'
              });
            }
          }

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: 'Error',
            e: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // CONFIRM EMAIL------------------------------------------------


var confirmEmail = function confirmEmail(req, res) {
  var token, decoded, admin;
  return regeneratorRuntime.async(function confirmEmail$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = req.params.token;
          decoded = jwt.verify(token, process.env.EMAILTOKEN);

          if (decoded) {
            _context3.next = 7;
            break;
          }

          res.status(400).json({
            message: "in-valid token"
          });
          _context3.next = 21;
          break;

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(adminModel.findById(decoded.id).select('confirmEmail'));

        case 9:
          admin = _context3.sent;

          if (admin) {
            _context3.next = 14;
            break;
          }

          res.status(400).json({
            message: "in-valid token id"
          });
          _context3.next = 21;
          break;

        case 14:
          if (!admin.confirmEmail) {
            _context3.next = 18;
            break;
          }

          res.status(400).json({
            message: 'u are already confirmed please proceed to login pages'
          });
          _context3.next = 21;
          break;

        case 18:
          _context3.next = 20;
          return regeneratorRuntime.awrap(adminModel.findByIdAndUpdate(admin._id, {
            confirmEmail: true
          }, {
            "new": true
          }));

        case 20:
          res.status(200).json({
            message: "please login "
          });

        case 21:
          _context3.next = 26;
          break;

        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'catch err confirm email',
            e: _context3.t0
          });

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 23]]);
}; // SEND CODE----------------------------------------------


var sencode = function sencode(req, res) {
  var email, admin, code;
  return regeneratorRuntime.async(function sencode$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          email = req.body.email;
          _context4.next = 3;
          return regeneratorRuntime.awrap(adminModel.findOne({
            email: email
          }));

        case 3:
          admin = _context4.sent;

          if (admin) {
            _context4.next = 8;
            break;
          }

          res.status(404).json({
            message: 'invalid email '
          });
          _context4.next = 14;
          break;

        case 8:
          code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
          console.log(code);
          message = "<p>use this code to reset your password ".concat(code, " </p>");
          _context4.next = 13;
          return regeneratorRuntime.awrap(adminModel.findByIdAndUpdate(admin._id, {
            code: code
          }));

        case 13:
          //   sendEmail(email,message)
          res.status(200).json({
            message: 'Done'
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //LOGIN------------------------------------------------


var signinAdmin = function signinAdmin(req, res) {
  var _req$body2, email, password, admin, match, token;

  return regeneratorRuntime.async(function signinAdmin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context5.next = 4;
          return regeneratorRuntime.awrap(adminModel.findOne({
            email: email
          }));

        case 4:
          admin = _context5.sent;

          if (admin) {
            _context5.next = 9;
            break;
          }

          res.status(404).json({
            message: "sorry the email not founded"
          });
          _context5.next = 25;
          break;

        case 9:
          if (admin.confirmEmail) {
            _context5.next = 13;
            break;
          }

          res.status(400).json({
            message: "please confirm Your Email"
          });
          _context5.next = 25;
          break;

        case 13:
          _context5.next = 15;
          return regeneratorRuntime.awrap(bcrypt.compare(password, admin.password));

        case 15:
          match = _context5.sent;
          console.log(match);

          if (match) {
            _context5.next = 21;
            break;
          }

          res.status(400).json({
            message: "invalid pass"
          });
          _context5.next = 25;
          break;

        case 21:
          token = jwt.sign({
            id: admin._id,
            loggedIn: true
          }, process.env.LOGINTOKEN, {
            expiresIn: '1h'
          });
          _context5.next = 24;
          return regeneratorRuntime.awrap(adminModel.findByIdAndUpdate(admin._id, {
            online: true
          }));

        case 24:
          res.status(200).json({
            message: "login success",
            token: token
          });

        case 25:
          _context5.next = 30;
          break;

        case 27:
          _context5.prev = 27;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: 'catch err login'
          });

        case 30:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 27]]);
}; //getAllAdmin  -----------------------------------------------------------------------------


var getAllAdmin = function getAllAdmin(req, res) {
  var findAdmins;
  return regeneratorRuntime.async(function getAllAdmin$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(adminModel.find());

        case 3:
          findAdmins = _context6.sent;
          res.json('done findAdmins', findAdmins);
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.json({
            message: 'error in findAdmins '
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  signupAdmin: signupAdmin,
  refreshEmail: refreshEmail,
  confirmEmail: confirmEmail,
  signinAdmin: signinAdmin,
  getAllAdmin: getAllAdmin
};