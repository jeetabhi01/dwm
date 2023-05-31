const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductivityChallenge = new Schema(
  {
    challenge: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productivityChallenge = mongoose.model(
  "Productivity_challenge",
  ProductivityChallenge
);

module.exports = productivityChallenge;
