const express = require("express");
const pc = require("../models/ProductivityChallenges");
const pa = require("../models/ProductivityActions");
const { graphController } = require("../Controller/Graph");
const router = express.Router();

router.get("/productivity/target", (req, res) => {
  res.render("Productivity/ProductivityTarget", {
    title: "Productivity Target",
  });
});

router.get("/productivity/moptrend", (req, res) => {
  graphController("Productivity/mopTrend", "MOP Trend", res);
});

router.get("/productivity/hpev2", (req, res) => {
  graphController("Productivity/hpev2", "HPeV2 Trend", res);
});

router.get("/productivity/do", async (req, res) => {
  try {
    const [challenges, actions] = await Promise.all([pc.find(), pa.find()]);
    res.render("Productivity/do", {
      title: "Productivity do's",
      challenges,
      actions,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.post("/addPA", (req, res) => {
  let action = new pa(req.body);
  action
    .save()
    .then(res.redirect("http://localhost:5000/productivity/form"))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.post("/addPC", async (req, res) => {
  let challenge = new pc(req.body);
  await challenge
    .save()
    .then(res.redirect("http://localhost:5000/productivity/form"));
});

router.get("/Productivity/form", (req, res) => {
  res.render("Productivity/form", {
    title: "Productivity Do's",
  });
});

router.get("/productivity", (req, res) => {
  res.render("Productivity/index", { title: "Productivity" });
});
module.exports = router;
