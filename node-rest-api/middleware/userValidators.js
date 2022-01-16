
const Joi = require("joi");

const registerSchema = (obj) => {
    var schema = Joi.object({
      password: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string(),
      created: Joi.date(),
    });
    return schema.validate(obj);
  };
  
  const loginSchema = (obj) => {
    var schema = Joi.object({
      password: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
    });
    return schema.validate(obj);
  };

  module.exports = {
    registerJoi,
    loginJoi,
  };