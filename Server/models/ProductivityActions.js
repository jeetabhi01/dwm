const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductivityAction = new Schema(
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

const productivityAction = mongoose.model(
  "Productivity_Action",
  ProductivityAction
);

module.exports = productivityAction;
