const { DataTypes, sequelize } = require("../lib/index.js");

const Supplier = sequelize.define("suppliers", {
  name: DataTypes.STRING,
  contact: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  phone: DataTypes.STRING,
});

module.exports = { Supplier };