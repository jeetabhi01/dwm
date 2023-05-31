const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QualityChallenge = new Schema(
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

const qualityChallenge = mongoose.model("Quality", QualityChallenge);

module.exports = qualityChallenge;
