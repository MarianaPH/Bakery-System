const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { authSchemaRegister } = require("../config/validationJoi");

const User = require("../models/User");

function validateUser(req) {}

async function validar(req, res) {
  try {
    const { password } = req.body;
    const result = await authSchemaRegister.validateAsync(req.body);
    //See if user exists
    let user = await User.findOne({ email: result.email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name: result.name,
      email: result.email,
      password: result.password,
    }); //just create the user but don´t save it

    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).send(error.message);
    }
    res.status(500).send("Server error");
  }
}

module.exports = {
  validateUser,
  validar,
};
