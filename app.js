const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cakeRoutes = require("./API/cake/routes");
const db = require("./db/models/index");

const app = express();
// middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/cakes", cakeRoutes);

// Error Handling MiddleWare
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
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
