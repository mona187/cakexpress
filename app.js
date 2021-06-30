const express = require("express");
let cakes = require("./cakes");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");
const app = express();
// middleware
app.use(cors());
app.use(bodyParser.json());
// Routes
app.get("/cakes", (req, res) => {
  res.json(cakes);
});

app.delete("/cakes/:cakeId", (req, res) => {
  const { cakeId } = req.params;

  const foundCake = cakes.find((cake) => cake.id === +cakeId);

  if (foundCake) {
    cakes = cakes.filter((cake) => cake.id !== +cakeId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cakes Not Found" });
  }
});
app.post("/cakes", (req, res) => {
  const id = cakes.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newCake = {
    id,
    slug,
    ...req.body,
  };
  cakes.push(newCake);
  res.status(201).json(newCake);
});
app.put("/cakes/:cakeId", (req, res) => {
  const { cakeId } = req.params;

  const foundCake = cakes.find((cake) => cake.id === +cakeId);

  if (foundCake) {
    for (const key in req.body) foundCake[key] = req.body[key];
    foundCake.slug = slugify(foundCake.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cakes Not Found" });
  }
});
app.listen(8000, () => {
  console.log("The application works");
});
