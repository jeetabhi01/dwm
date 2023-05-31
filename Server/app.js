//Required Dependencies
const express = require("express");
const xlsx = require("xlsx");
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
  .then(app.listen(5000, () => {}));

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
app.get("/safety/data", (req, res) => {
  // console.log(data)
  const filepath = path.resolve(__dirname, "test.xlsx");

  let workbook = xlsx.readFile(filepath);
  let sheetNames = workbook.SheetNames;
  let data = {
    safetyPlan: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]),
    trcfr: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[1]]),
    actionPlan: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[2]]),
  };
  res.send(data);
});

app.get("/quality/data", (req, res) => {
  const filepath = path.resolve(__dirname, "test.xlsx");
  let workbook = xlsx.readFile(filepath);
  let sheetNames = workbook.SheetNames;
  let data = {
    qualityPerformance: xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetNames[3]]
    ),
    qualityPunch: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[4]]),
    overallPunch: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[4]]),
    overallAltroz: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[5]]),
    cpaAltroz: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[6]]),
    cpaPunch: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[7]]),
    action: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[8]]),
  };
  res.send(data);
});

app.get("/productivity/data", (req, res) => {
  // console.log(data)
  const filepath = path.resolve(__dirname, "Productivity.xlsx");

  let workbook = xlsx.readFile(filepath);
  let sheetNames = workbook.SheetNames;
  let data = {
    productivityTarget: xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetNames[0]]
    ),
    mopTrend: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[1]]),
    hpev2Trend: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[2]]),
  };
  res.send(data);
});

app.get("/delivery/data", (req, res) => {
  const filepath = path.resolve(__dirname, "Delivery.xlsx");

  let workbook = xlsx.readFile(filepath);
  let sheetNames = workbook.SheetNames;
  let data = {
    deliveryTarget: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]),
    mape: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[1]]),
    otif: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[2]]),
  };
  res.send(data);
});

app.get("/cost/data", (req, res) => {
  const filepath = path.resolve(__dirname, "Cost.xlsx");

  let workbook = xlsx.readFile(filepath, { cellDates: true });
  let sheetNames = workbook.SheetNames;
  let data = {
    costTarget: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]),
    powerTrend: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[1]]),
    toolTrend: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[2]]),
    imcTrend: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[3]]),
    rejectionTrend: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[4]]),
    vccrejreduction: xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[5]], {
      dateNF: 'mmm".    "yy',
    }),
  };
  console.log(data["vccrejreduction"]);
  res.send(data);
});

app.get("/import_excel", (req, res) => {
  res.render("Safety/updateexcel", { title: "Update" });
});
app.post(
  "/import_excel",
  fileUpload({ createParentPath: true }),
  (req, res) => {
    const files = req.files;
    console.log(files);
    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, "test.xlsx");
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });
  }
);

app.post("/updateTarget", async (req, res) => {
  let body = req.body;
  const date = new Date(body["month"]); // replace this with your date object
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // add 1 since getMonth() returns a zero-based index
  const formattedDate = new Date(year, month - 1).toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
  // console.log({month:formattedDate,target:body['target'],actual:body['actual']})
  // console.log(formattedDate)

  // let test = new Test(req.body);
  // test.save().then(
  //     res.redirect('http://localhost:5000/')
  // ).catch(err => {
  //     console.log(err);
  //     res.sendStatus(400);
  // })
  //  let found = await Target.findOne({month:formattedDate}).then(result=> {
  //     // console.log(result.toJSON());
  //     if(result !==null)
  //      return result.toJSON();
  //     else return null
  //
  // })
  // console.log(found)
  // res.redirect('/')
  //
  //

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
     let data = await Target.findOneAndDelete(req.body).then(data=>{
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
