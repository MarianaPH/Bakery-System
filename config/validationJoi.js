const { string } = require("joi");
const Joi = require("joi");

const authSchemaRegister = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
});

module.exports = {
  authSchemaRegister,
};
