const express = require("express");
const request = require('request');
const fetch = require('node-fetch');
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

// CONSTANTS
const ZOOM_AUTH = 'https://zoom.us/oauth/authorize?response_type=code';
const ZOOM_GET_AUTHCODE = 'https://zoom.us/oauth/token?grant_type=authorization_code';

// start
const router = express.Router();

// const token = jwt.sign(payload, process.env.API_SECRET); //your API SECRET HERE

// /zoomapi/token
router.get("/token", (req, res) => {
  const { state, code } = req.query;
  const {cors_token} = req.cookies;
  let decodedToken;
  if (!(code && (decodedToken = jwt.verify(state, process.env.API_STATE_SECRET)) && cors_token === decodedToken.uuid)) {
    const corsToken = uuidv4();
    return res
    .cookie('cors_token', corsToken)
    .redirect(ZOOM_AUTH
      + `&client_id=${process.env.CLIENT_ID}`
      + `&state=${jwt.sign({uuid: corsToken}, process.env.API_STATE_SECRET, {expiresIn: "60000ms"})}` // expires in 60 seconds
      + `&redirect_uri=${process.env.redirectURL}`);
  } else {
    // get access_token and refresh_token using zoom api and forward it to browser
    console.log("code", code);
    console.log("redirect_uri", process.env.redirectURL);

    const url = ZOOM_GET_AUTHCODE
      + `&code=${code}`
      + `&redirect_uri=${process.env.redirectURL}`;

    console.log("url: ", url);

    request.post(url, (error, response, body) => {
      // Parse response to JSON
      if (error) {
        console.log("error happened: ", error)
        return res.status(400).json('Something went wrong');
      }

      const parsedBody = JSON.parse(body);
      const { access_token, refresh_token } = parsedBody;

      // log
      console.log(`Zoom OAuth Access Token: ${access_token}`);
      console.log(`Zoom OAuth Refresh Token: ${refresh_token}`);

      if (access_token && refresh_token) {
        return res
          .cookie('access_token', access_token)
          .cookie('refresh_token', refresh_token)
          .cookie('cors_token', '') // todo: uncomment
          .send("<script>window.close()</script>");
      } else {
        console.log("this is shit2: ")
        return res.status(400).send('Something went wrong');
      }
    }).auth(process.env.CLIENT_ID, process.env.clientSecret);
  }
});

router.post("/createMeeting", async (req, res) => {
  const { start_time, topic, access_token } = req.body;

  console.log("bodyyy: ", req.body);

  const url = "https://api.zoom.us/v2/users/me/meetings"
  const bodyToSend = {
    agenda: topic,
    start_time,
    type: 2
  };

  const fetchOptions = {
    method: "POST",
    headers: {
      "Authorization": access_token,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(bodyToSend),
  };

  const response = await fetch(url, fetchOptions);

  console.log(response);
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage);
  }

  const json = await response.json();
  console.log(json);
  res.json(json);
});

router.post("/meetingStartUrl", async (req, res) => {
  const { meeting_id, access_token } = req.body;

  console.log("bodyyy: ", req.body);

  const url = `https://api.zoom.us/v2/meetings/${meeting_id}`
  
  const fetchOptions = {
    method: "GET",
    headers: {
      "Authorization": access_token,
      "Accept": "application/json"
    },
  };

  const response = await fetch(url, fetchOptions);

  console.log(response);
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage);
  }

  const json = await response.json();
  console.log(json);
  res.json(json);
});

module.exports = router;
