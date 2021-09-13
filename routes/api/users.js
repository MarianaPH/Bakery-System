const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../../controllers/user");

//@route      POST api/users
//@desc       Test route
//access      Public

router.post("/", userController.validar);

module.exports = router;
