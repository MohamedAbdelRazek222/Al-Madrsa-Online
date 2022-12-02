"use strict";

var Joi = require('joi');

var signUpValidation = {
  body: Joi.object().required().keys({
    name: Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),
    cpassword: Joi.string().valid(Joi.ref('password')).required()
  })
};
var signinValidation = {
  body: Joi.object().required().keys({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required()
  })
};
module.exports = {
  signUpValidation: signUpValidation,
  signinValidation: signinValidation
};