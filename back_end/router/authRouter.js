const { json } = require("express");
const express = require("express");
const bcrypt = require('bcrypt')
const UserModel = require("../models/user");
const { get, getById, getBy, add, editById, deleteById } = require("../utils/crud");
const { signToken, verifyToken } = require('../utils/token');
const StudentModel = require("../models/student");
const teacherModel = require("../models/teacher");
const adminModel = require("../models/admin");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const auth_token = req.headers['authorization'];
  // assumption!!! auth_token already verified
  const rolesToModel = {"student": StudentModel, "teacher": teacherModel, "admin": adminModel};
  if (auth_token) {
    try {
      verifyToken(auth_token.split("Bearer ")[1]);
      return res.json({token: auth_token.split("Bearer ")[1]});
    } catch (e) {
      console.log("invalid token", e)
    }
  }

  // console.log("correct 1")
  const { email, password, role } = req.body
  const user = await getBy({ email }, rolesToModel[role], []);
  
  // console.log("correct 2")
  if (!user) {
    return res.status(401).end();
  }

  const { _id: id, name, password: userPassword } = user;
  const match = await bcrypt.compare(password, userPassword);
  if (!match) {
    return res.status(401).end();
  }

  // console.log("correct 4")

  const token = signToken({ id, name, role ,loggedIn:true});
  res.json({token});
});

router.post("/signup", async (req, res) => {
  console.log("we are here in signup")
  try {
    const { username, email, password, role } = req.body;
    const bcryptPass = await bcrypt.hash(password, 8);
    const user = await add(new UserModel({ username, email, password: bcryptPass, role }), []);
    console.log("user", user);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
