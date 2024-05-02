const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const activityController = require("./controller/activity");
const userController = require("./controller/user");
const activityRecordController = require("./controller/activityRecord");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/activity", activityController);
app.use("/user", userController);
app.use("/activityRecord", activityRecordController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
