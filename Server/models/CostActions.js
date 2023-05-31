const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CostAction = new Schema(
  {
    action: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const costAction = mongoose.model("Cost_Action", CostAction);

module.exports = costAction;
