"use strict";

var express = require("express");

var mongoose = require("mongoose");

var dotEnv = require("dotenv");

var classRouter = require("./router/class");

var zoomRouter = require("./router/zoomRouter");

var slotRouter = require("./router/slotRouter");

var authRouter = require("./router/authRouter");

var adminRouter = require("./router/adminRouter");

var teacherRouter = require("./router/teacherRouter");

var cors = require('cors');

var path = require('path');

var cookieParser = require('cookie-parser');

var _require = require('./utils/token'),
    verifyToken = _require.verifyToken;

var bodyParser = require('body-parser');

var app = express();
var corsOptions = {
  origin: true,
  credentials: true // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
dotEnv.config(); // app.use(cors());

app.use(cors()); // app.options('*', cors()) // include before other routes

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser()); // app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "build")));

app.use("/auth", authRouter); // app.use((req, res, next) => {
//   // const {auth_token} = req.cookies;
//   const auth_token = req.header('Authorization');
//   if (!auth_token) {
//     return next(new Error("not auth"))
//   }
//   try {
//     req.auth_token = verifyToken(auth_token);
//     return next()
//   } catch (error) {
//     return next(error)
//   }
// })

app.use(express.json());
app.use("/class", classRouter);
app.use("/slot", slotRouter);
app.use("/zoomapi", zoomRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);
app.use(function (req, res, next) {// res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use(function (err, req, res, next) {
  console.error(err.stack); // res.status(500).redirect('/login.html')
});
mongoose.connect("mongodb://127.0.0.1:27017/elearning", function (err) {
  if (!err) return console.log("DB Connected Successfully");
  console.log(err);
});
app.listen(8000, function () {
  console.log("connected to port 8000");
});