const express = require('express');
const {signInForUser} = require("../validation/authentication.validation");
const {signInMethod} = require("../controller/authentication.controller");
const router = express.Router();



router.post('/login' , signInForUser , signInMethod)

module.exports = router;