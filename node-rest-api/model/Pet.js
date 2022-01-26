const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let petSchema = new Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["Dog", "Cat", "Horse", "Other"],
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "pets",
  }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = {
  Pet,
};
