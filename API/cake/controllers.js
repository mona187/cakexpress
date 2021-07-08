const { Cake, Bakery } = require("../../db/models");

exports.fetchCake = async (cakeId, next) => {
  try {
    const cake = await Cake.findByPk(cakeId);
    return cake;
  } catch (error) {
    next(error);
  }
};

exports.cakeFetch = async (req, res, next) => {
  try {
    const cakes = await Cake.findAll({
      attributes: { exclude: ["bakeryId", "createdAt", "updatedAt"] },
      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["name"],
      },
    });
    res.json(cakes);
  } catch (error) {
    next(error);
  }
};

exports.deleteCake = async (req, res, next) => {
  try {
    await req.cake.destroy();
    res.status(204).end(); // NO CONTENT
  } catch (error) {
    next(error);
  }
};
exports.createCake = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newCake = await Cake.create(req.body);

    res.status(201).json(newCake);
  } catch (error) {
    next(error);
  }
};
exports.updateCake = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const updatedCake = await req.cake.update(req.body);
    res.json(updatedCake);
  } catch (error) {
    next(error);
  }
};
