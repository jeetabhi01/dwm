//Required Dependencies
const express = require("express");
const path = require("path");
const mongo = require("mongoose");
const proc = require("process");
const fileUpload = require("express-fileupload");

//Routes
const safetyRoutes = require("./routes/safetyRoutes");
const qualityRoutes = require("./routes/qualityRoutes");
const productivityRoutes = require("./routes/productivityRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const costRoutes = require("./routes/costRoutes");

//DB Models
const Target = require("./models/TargetModel");
const Action = require("./models/ActionModel");
const Test = require("./models/TestModel");
//Required environment variables
const dbPWD = proc.env.DBPWD;

const app = express(); // const morgan = require('morgan');

//DBConnection to mongodb
mongo
  .connect(`mongodb://admin:${dbPWD}@127.0.0.1:27017/dwm`)
  .then(app.listen(5000, () => { }));

//Express configurations
app.set("view engine", "ejs");
app.set("views", "Server/views");
app.use(express.static("./Server/public/"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Usage Routes
app.use(safetyRoutes);
// app.use(qualityRoutes);
app.use(productivityRoutes);
app.use(deliveryRoutes);
app.use(costRoutes);

//Basic paths
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/slideshow", (req, res) => {
  res.render("slideshow");
});

app.get("/sqdcm", (req, res) => {
  res.render("sqdcm", { title: "SQDCM" });
});

//APIs


app.post("/updateTarget", async (req, res) => {
  let body = req.body;
  const date = new Date(body["month"]); // replace this with your date object
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // add 1 since getMonth() returns a zero-based index
  const formattedDate = new Date(year, month - 1).toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

  let target = new Target({
    month: formattedDate,
    target: body["target"],
    actual: body["actual"],
  });
  target
    .save()
    .then(res.redirect("http://localhost:5000/graph"))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/deleteTarget", async (req, res) => {
  try {
    let data = await Target.findOneAndDelete(req.body).then(data => {
      return (data.toJSON())
    })
    // console.log(data)
  } catch (e) {
    console.log(e);
  }
  res.redirect("/graph");
});

app.post("/updateStatus", (req, res) => {
  let action = new Action(req.body);
  action
    .save()
    .then(res.redirect("http://localhost:5000/"))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.get("/graph", (req, res) => {
  res.render("graph.ejs", { title: "Graph" });
});

app.get("/actionPlan", (req, res) => {
  res.render("actionPlan.ejs", { title: "Action Plan" });
});

app.get("/action", async (req, res) => {
  try {
    const pipeline = [
      { $match: {} },
      // {$sort:{}},
      {
        $project: { _id: 0, action: 1, status: 1, date: 1, responsibility: 1 },
      },
    ];
    const data = await Action.aggregate(pipeline);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});
app.get("/data", async (req, res) => {
  try {
    // let x = []
    const pipeline = [
      { $match: {} },
      { $project: { _id: 0, target: 1, actual: 1, month: 1 } },
    ];

    const data = await Target.aggregate(pipeline);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});
