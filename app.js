const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cakeRoutes = require("./API/cake/routes");
const app = express();
// middleware
app.use(cors());
app.use(bodyParser.json());
// Routes
app.use("/cakes", cakeRoutes);
app.listen(8000, () => {
  console.log("The application works");
});
