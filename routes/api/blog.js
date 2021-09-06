const { Router } = require("express");
const express = require("express");
const router = express.Router();

//@route      GET api/blog
//@desc       Test route
//access      Private
router.get("/", (req, res) => res.send("Blog route"));

module.exports = router;
