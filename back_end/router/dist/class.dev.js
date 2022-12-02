"use strict";

var express = require("express");

var StudentModel = require("../models/student");

var TeacherModel = require("../models/teacher");

var ClassModel = require("../models/class");

var _require = require("../utils/crud"),
    get = _require.get,
    getById = _require.getById,
    add = _require.add,
    editById = _require.editById,
    deleteById = _require.deleteById;

var _require2 = require("../middlewear/authen"),
    authen = _require2.authen,
    roles = _require2.roles;

var _require3 = require("../endPoint/endPoint"),
    endPoint = _require3.endPoint;

var router = express.Router();
router.get("/", function (req, res) {
  return get(ClassModel, ["teacher", "students"]).then(function (respose) {
    return res.json(respose);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).json("Error has occured");
  });
});
router.get("/:id", function (req, res) {
  var id = req.params.id;
  console.log(id);
  getById(id, ClassModel, ["teacher", "students"]).then(function (respose) {
    return res.json(respose);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).json("Error has occured");
  });
});
router.post("/", authen(endPoint["class"].addClass), function (req, res) {
  var classData = req.body;
  console.log(classData);
  add(new ClassModel(classData), ["teacher", "students"]).then(function (respose) {
    return res.json(respose);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).json("Error has occured");
  });
}); // router.post("/",authen(endPoint.class.addClass), async (req, res) => {
//   const classData = req.body;
//   console.log(classData);
//   try {
//     const clazz = await add(new ClassModel(classData), ["teacher", "students"]);
//     res.json(clazz);
//   } catch (e) {
//     console.log(e);
//     res.status(400).json("Error has occured");
//   }
// });

router.put("/:id", function (req, res) {
  var id = req.params.id;
  var overridingClassData = req.body;
  editById(id, overridingClassData, ClassModel, ["teacher", "students"]).then(function (respose) {
    return res.json(respose);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).json("Error has occured");
  });
});
router["delete"]("/:id", function (req, res) {
  var id = req.params.id;
  deleteById(id, ClassModel, ["teacher", "students"]).then(function (respose) {
    return res.json(respose);
  })["catch"](function (err) {
    console.log(err);
    res.status(400).json("Error has occured");
  });
});
module.exports = router;