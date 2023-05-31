const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliveryChallenges = new Schema(
  {
    challenge: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const deliveryChallenge = mongoose.model(
  "Delivery_Challenge",
  DeliveryChallenges
);

module.exports = deliveryChallenge;
