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
  const foundBakery = await Bakery.findByPk(req.cake.bakeryId);

  try {
    if (foundBakery.userId === req.user.id) {
      await req.cake.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateCake = async (req, res, next) => {
  const foundBakery = await Bakery.findByPk(req.cake.bakeryId);

  try {
    if (foundBakery.userId === req.user.id) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      const updatedCake = await req.cake.update(req.body);
      res.json(updatedCake);
    } else {
      const err = new Error("Unauthorized!");
      err.status = 401;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
