const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Cake = sequelize.define("Cake", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
      defaultValue: 4,
    },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Cake, { source: ["name"] });
  return Cake;
};
