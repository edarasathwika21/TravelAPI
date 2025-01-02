const { Supplier } = require("./supplier.js");
const { Product } = require("./product.js");

Product.belongsTo(Supplier, { foreignKey: "supplierId" });
Supplier.hasMany(Product, { foreignKey: "supplierId" });
