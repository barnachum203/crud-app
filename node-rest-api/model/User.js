const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const Joi = require("joi");

// Joi.objectId = require('joi-objectid')(Joi);

let userSchema = new Schema(
  {
    email: {
      type: String,
      // required: true,
      unique: true,
      // lowercase: true,
    },
    password: {
      type: String,
      // required: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    age: {
      type: Number,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    created: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "users",
  }
);

//hash password before the "save"
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const joiValidate = (obj) => {
  var schema = Joi.object({
    password: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string(), 
    created: Joi.date(),
  });
  return schema.validate(obj);
};
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  joiValidate,
};
