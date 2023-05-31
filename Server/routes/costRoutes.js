const express = require("express");
const cc = require("../models/CostChallenges");
const ca = require("../models/CostActions");
const router = express.Router();

router.get("/cost/target", (req, res) => {
  res.render("Cost/target", { title: "Cost Target" });
});

router.get("/cost/dos", async (req, res) => {
  try {
    const [challenges, actions] = await Promise.all([dc.find(), da.find()]);
    res.render("Cost/do", { title: "Cost do's", challenges, actions });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/cost/powertrend", (req, res) => {});

router.get("/cost/tooltrend", (req, res) => {});
router.get("/cost/imctrend", (req, res) => {});

router.get("/cost/rejectiontrend", (req, res) => {});

router.get("/cost/actionplan", (req, res) => {
  res.render("Cost/actionplan", {
    title: "VCC Rejection Reduction action plan",
  });
});

module.exports = router;
