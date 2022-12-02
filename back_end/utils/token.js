
const jwt = require('jsonwebtoken');

const verifyToken = (token) => jwt.verify(token, process.env.LOGINTOKEN);
const signToken = (token) => jwt.sign(token, process.env.LOGINTOKEN);

module.exports = {verifyToken, signToken};