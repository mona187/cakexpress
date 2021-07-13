const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cakeRoutes = require("./API/cake/routes");
const bakeryRoutes = require("./API/bakery/routes");
const userRoutes = require("./API/user/routes.js");

const { localStrategy } = require("./middleware/passport");
const db = require("./db/models/index");

const app = express();
// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
// Routes
app.use(userRoutes);
app.use("/cakes", cakeRoutes);
app.use("/bakeries", bakeryRoutes);
app.use("/media", express.static("media"));

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found " });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection successful");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error(error);
  }
};

run();
