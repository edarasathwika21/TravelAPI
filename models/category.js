const { DataTypes, sequelize } = require("../lib/index.js");

const Category = sequelize.define("categories", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
});

module.exports = { Category };
