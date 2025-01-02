const { DataTypes, sequelize } = require("../lib/index.js");
const { Product } = require("./product");
const { Category } = require("./category");

let ProductCategory = sequelize.define("ProductCategory", {
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Product",
      key: "id",
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Category",
      key: "id",
    },
  },
});

// Define associations
Product.belongsToMany(Category, { through: "ProductCategory" });
Category.belongsToMany(Product, { through: "ProductCategory" });

module.exports = { ProductCategory };
