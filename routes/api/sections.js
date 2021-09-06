const { Router } = require("express");
const express = require("express");
const router = express.Router();

//@route      GET api/sections
//@desc       Test route
//access      Private
router.get("/", (req, res) => res.send("Sections route"));

module.exports = router;
