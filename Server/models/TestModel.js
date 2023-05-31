const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Test = new Schema(
  {
    month: {
      type: Date,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    actual: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const test = mongoose.model("Test", Test);
module.exports = test;
