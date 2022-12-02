const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const classRouter = require("./router/class");
const zoomRouter = require("./router/zoomRouter");
const slotRouter = require("./router/slotRouter");
const authRouter = require("./router/authRouter");
const ParentRouter = require('./router/ParentRouter');
const adminRouter = require("./router/adminRouter");
const teacherRouter = require("./router/teacherRouter");
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser')
const { verifyToken } = require('./utils/token')
const bodyParser = require('body-parser');
const { add, get, getBy } = require("./utils/crud");
const teacherModel = require("./models/teacher");
const adminModel = require("./models/admin");
const bcrypt = require('bcrypt');
const attendrouter = require("./router/attendanceRouter");
const studentrouter = require("./router/student");

const app = express();
var corsOptions = {
  origin: true,
  credentials: true
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

dotEnv.config();
// app.use(cors());
app.use(cors());
// app.options('*', cors()) // include before other routes
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "build")));
// app.use((req, res, next) => {
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
app.use((req, res, next) => {
  console.log("request received:", req.method, req.url, req.headers, req.body)
  next()
})

app.use("/class", classRouter);
app.use("/slot", slotRouter);
app.use("/zoomapi", zoomRouter);
app.use('/Parent', ParentRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);
app.use("/student", studentrouter);
app.use("/auth", authRouter);
app.use("/auth", authRouter);
app.use("/attend", attendrouter);

app.use((req, res, next) => {
  // res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).end();
})

mongoose.connect("mongodb://127.0.0.1:27017/elearning", (err) => {
  if (err) {
    return console.log(err, "now");
  }

  console.log("DB Connected Successfully");
  bcrypt.hash("12345678", 8) // test admin
    .then((password) => {
      console.log("we are adding a new admin")
      add(new adminModel({
        name: "testadmin",
        email: "testadmin@dafs.com",
        password: password,
        confirmEmail: true
      }), [])
      .catch(err => console.log("error happened", err))
    })

});

app.listen(8000, () => {
  console.log(`connected to port 8000`);
});
