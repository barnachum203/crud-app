const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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


const User = mongoose.model("User", userSchema);

module.exports = {
  User
};
