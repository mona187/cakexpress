const { Bakery, Cake } = require("../../db/models");

exports.fetchBakery = async (bakeryId, next) => {
  try {
    const bakery = await Bakery.findByPk(bakeryId);
    return bakery;
  } catch (error) {
    next(error);
  }
};

exports.bakeryFetch = async (req, res, next) => {
  try {
    const bakeries = await Bakery.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Cake,
        as: "cakes",
        attributes: ["id"],
      },
    });
    res.json(bakeries);
  } catch (error) {
    next(error);
  }
};

exports.createBakery = async (req, res, next) => {
  try {
    const foundBakery = await Bakery.findOne({
      where: { userId: req.user.id },
    });
    if (foundBakery) {
      const err = new Error("You already own a Bakery!");
      err.status = 400;
      return next(err);
    }
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.userId = req.user.id;
    const newBakery = await Bakery.create(req.body);

    res.status(201).json(newBakery);
  } catch (error) {
    next(error);
  }
};

exports.createCake = async (req, res, next) => {
  try {
    if (req.user.id === req.bakery.userId) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      req.body.bakeryId = req.bakery.id;
      const newCake = await Cake.create(req.body);

      res.status(201).json(newCake);
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
