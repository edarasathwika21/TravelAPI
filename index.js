const express = require("express");
const { sequelize } = require("./lib/index.js");
const { Category } = require("./models/category");
const { Product } = require("./models/product");
const { Supplier } = require("./models/supplier");
const { ProductCategory } = require("./models/productCategory");
require("./models/associations.js");

const app = express();

app.use(express.json());

//Given Data
const suppliersData = [
  {
    name: "TechSupplies",
    contact: "John Doe",
    email: "contact@techsupplies.com",
    phone: "123-456-7890",
  },
  {
    name: "HomeGoods Co.",
    contact: "Jane Smith",
    email: "contact@homegoodsco.com",
    phone: "987-654-3210",
  },
];

const productsData = [
  {
    name: "Laptop",
    description: "High-performance laptop",
    quantityInStock: 50,
    price: 120099,
    supplierId: 1,
  },
  {
    name: "Coffee Maker",
    description: "12-cup coffee maker",
    quantityInStock: 20,
    price: 45000,
    supplierId: 2,
  },
];

const categoriesData = [
  { name: "Electronics", description: "Devices and gadgets" },
  {
    name: "Kitchen Appliances",
    description: "Essential home appliances for kitchen",
  },
];

app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });
  await Category.bulkCreate(categoriesData);
  await Supplier.bulkCreate(suppliersData);
  await Product.bulkCreate(productsData);
  return res.json({ message: "Database seeded successfully" });
});

app.post("/suppliers/new", async (req, res) => {
  const newSupplier = req.body.newSupplier;
  try {
    const result = await Supplier.create(newSupplier);
    res.status(200).json({ newSupplier: result });
  } catch (error) {
    res.status(500).json({ message: "Error adding supplier" });
  }
});

app.post("/products/new", async (req, res) => {
  const newProduct = req.body.newProduct;
  try {
    const result = await Product.create(newProduct);
    res.status(200).json({ newProduct: result });
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

app.post("/categories/new", async (req, res) => {
  const newCategory = req.body.newCategory;
  try {
    const result = await Category.create(newCategory);
    res.status(200).json({ newCategory: result });
  } catch (error) {
    res.status(500).json({ message: "Error adding category" });
  }
});

app.post(
  "/products/:productId/assignCategory/:categoryId",
  async (req, res) => {
    const productId = req.params.productId;
    const categoryId = req.params.categoryId;
    try {
      const result = await ProductCategory.create({ productId, categoryId });
      res
        .status(200)
        .json({ message: "Product assigned to category successfully", result });
    } catch (error) {
      res.status(500).json({ message: "Error assigning category" });
    }
  },
);

async function getAllProductsByCategoryId(categoryId) {
  let productIds = await ProductCategory.findAll({
    where: { categoryId },
    attributes: ["productId"],
  });

  let productRecords = [];
  for (let i = 0; i < productIds.length; i++) {
    productRecords.push(productIds[i].productId);
  }

  let products = await Product.findAll({
    where: { id: productRecords },
  });
  return products;
}

app.get("/categories/:id/products", async (req, res) => {
  const id = req.params.id;
  try {
    const resData = await getAllProductsByCategoryId(id);
    res.status(200).json({ products: resData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.post("/suppliers/:id/update", async (req, res) => {
  try {
    const id = req.params.id;
    const updateSupplier = req.body.updateSupplier;
    const result = await Supplier.findOne({
      where: { id },
    });
    await result.set(updateSupplier);
    const updatedSupplier = await result.save();
    res.status(200).json({ updatedSupplier: updatedSupplier });
  } catch (error) {
    res.status(500).json({ message: "Error updating supplier" });
  }
});

app.post("/suppliers/delete", async (req, res) => {
  try {
    const id = req.body.id;
    const result = await Supplier.findOne({
      where: {
        id,
      },
    });
    await result.destroy();
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting supplier" });
  }
});

app.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json({ Suppliers: suppliers });
  } catch (error) {
    console.error("Error fetching suppliers and related data:", error);
    res.status(500).json({ message: "Error retrieving data" });
  }
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
