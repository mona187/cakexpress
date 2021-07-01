let cakes = require("../../cakes");

const slugify = require("slugify");

exports.cakeFetch = (req, res) => {
  res.json(cakes);
};
exports.deleteCake = (req, res) => {
  const { cakeId } = req.params;
  const foundCake = cakes.find((cake) => cake.id === +cakeId);

  if (foundCake) {
    cakes = cakes.filter((cake) => cake.id !== +cakeId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cakes Not Found" });
  }
};
exports.createCake = (req, res) => {
  const id = cakes.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newCake = {
    id,
    slug,
    ...req.body,
  };
  cakes.push(newCake);
  res.status(201).json(newCake);
};
exports.updateCake = (req, res) => {
  const { cakeId } = req.params;

  const foundCake = cakes.find((cake) => cake.id === +cakeId);

  if (foundCake) {
    for (const key in req.body) foundCake[key] = req.body[key];
    foundCake.slug = slugify(foundCake.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cakes Not Found" });
  }
};
