const Sequelize = require("sequelize");

const sequelize = new Sequelize("sqlite:./database.sqlite");

const DataTypes = Sequelize.DataTypes;

module.exports = { DataTypes, sequelize };
