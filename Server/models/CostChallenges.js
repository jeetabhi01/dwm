const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CostChallenge = new Schema(
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

const costChallenge = mongoose.model("Cost_challenge", CostChallenge);

module.exports = costChallenge;
