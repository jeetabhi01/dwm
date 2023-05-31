const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Target = new Schema(
  {
    month: {
      type: String,
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
  { timestamps: true }
);

const target = mongoose.model("Target", Target);
module.exports = target;
