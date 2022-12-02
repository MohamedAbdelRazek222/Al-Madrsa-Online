const express = require("express");
const router = express.Router();
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// CONSTANTS
const ZOOM_AUTH = 'https://zoom.us/oauth/authorize?response_type=code&client_id=';
const ZOOM_GET_AUTHCODE = 'https://zoom.us/oauth/token?grant_type=authorization_code&code=';

// const payload = {
//   iss: process.env.API_KEY, //your API KEY
//   exp: new Date().getTime() + 10000, // ms
// };

// const token = jwt.sign(payload, process.env.API_SECRET); //your API SECRET HERE

router.get("/token", (req, res) => {
  const {state, code} = req.query;
  if (!(code && jwt.verify(state, process.env.API_STATE_SECRET))) {
    res.redirect(ZOOM_AUTH + process.env.clientID + '&redirect_uri=' + process.env.redirectURL)
  }
});


// const email = process.env.API_EMAIL; // your zoom developer email account
//   const options = {
//     method: "POST",
//     uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
//     body: {
//       topic: "Zoom Meeting Using Node JS", //meeting title
//       type: 1,
//       settings: {
//         host_video: "true",
//         participant_video: "true",
//       },
//     },
//     auth: {
//       bearer: token,
//     },
//     headers: {
//       "User-Agent": "Zoom-api-Jwt-Request",
//       "content-type": "application/json",
//     },
//     json: true, //Parse the JSON string in the response
//   };

//   requestPromise(options)
//     .then(function (response) {
//       console.log("response is: ", response);
//       res.json(response);
//     })
//     .catch(function (err) {
//       // API call failed...
//       console.log("API call failed, reason ", err);
//       res.json("error occured");
//     });

module.exports = router;
