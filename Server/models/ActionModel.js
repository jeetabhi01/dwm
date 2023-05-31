const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Action = new Schema(
  {
    action: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },

    responsibility: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const action = mongoose.model("Action", Action);
module.exports = action;
