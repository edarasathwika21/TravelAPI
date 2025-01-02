const { DataTypes, sequelize } = require("../lib/index.js");
const { Supplier } = require("./supplier");

const Product = sequelize.define("product", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  quantityInStock: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
});

module.exports = { Product };
