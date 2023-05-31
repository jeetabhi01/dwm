const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliveryChallenge = new Schema(
  {
    action: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const deliveryActions = mongoose.model("delivery_action", DeliveryChallenge);
module.exports = deliveryActions;
