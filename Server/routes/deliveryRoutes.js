const express = require("express");
const dc = require("../models/deliveryChallenges");
const da = require("../models/deliveryActions");

const router = express.Router();

router.get("/delivery", (req, res) => {
  res.render("Delivery/index", { title: "Delivery" });
});
router.get("/delivery/target", (req, res) => {
  res.render("Delivery/target", { title: "Delivery Target" });
});

router.get("/delivery/dos", async (req, res) => {
  try {
    const [challenges, actions] = await Promise.all([dc.find(), da.find()]);
    res.render("Productivity/do", {
      title: "Delivery do's",
      challenges,
      actions,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get("/delivery/mape", (req, res) => {
  res.render("Delivery/mape", {
    title: "Mean absolute percentage error(1-MAPE)",
    type: "bar",
  });
});

router.get("/delivery/otif", (req, res) => {
  res.render("Delivery/otif", {
    title: "On time Full Delivery @Dealer - OTIF",
    type: "bar",
  });
});

router.get("/delivery/form", (req, res) => {
  res.render("Delivery/form", { title: "Add Delivery Challenges and Actions" });
});

router.post("/addDA", (req, res) => {
  let action = new da(req.body);
  action
    .save()
    .then(
      // let target = new target({formattedDate,body['target'],body['actual']}]);
      // target.save().then(
      //     res.redirect('http://localhost:5000//updateTarget')
      // ).catch(err => {
      //     console.log(err);
      //     res.sendStatus(400);
      // })
      res.redirect("http://localhost:5000/delivery/form")
    )
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.post("/addDC", async (req, res) => {
  let challenge = new dc(req.body);
  await challenge
    .save()
    .then(res.redirect("http://localhost:5000/delivery/form"));
});

module.exports = router;
