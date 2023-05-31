const express = require("express");
const xlsx = require("xlsx");
const path = require("path");
const mongo = require("mongoose");
const router = express.Router();

router.get("/safety", (req, res) => {
  res.render("Safety/index", { title: "Safety", type: "bar" });
});

router.get("/safety/actionPlan", (req, res) => {
  res.render("Safety/SafetyAction", { title: "Action Plan" });
});

router.get("/safety/target", (req, res) => {
  res.render("Safety/SafetyTarget", { title: "Safety Target" });
});

router.get("/safety/trcfr", (req, res) => {
  res.render("Safety/TRCFR", { title: "TRCFR Trend", type: "bar" });
  // res.end();
});

module.exports = router;
