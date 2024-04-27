const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const collectionName = "fakestore_catalog";

const client = new MongoClient(url);
const db = client.db(dbName);

// Endpoint to list all products
app.get("/products", async (req, res) => {
  await client.connect();
  const products = await db.collection(collectionName).find({}).toArray();
  if (products.length > 0) {
    res.status(200).send(products);
  } else {
    res.status(404).send("No products found.");
  }
});

// Get a single product by ID
app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  await client.connect();
  const query = { _id: new ObjectId(productId) };
  const product = await db.collection(collectionName).findOne(query);
  if (!product) res.status(404).send("Product not found");
  else res.status(200).send(product);
});

// Add a new product
app.post("/products", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "Bad request: No data provided." });
    }
    await client.connect();

    // Find the maximum 'id' value from the existing documents
    const maxIdDoc = await db.collection(collectionName).findOne({}, { sort: { id: -1 } });
    let maxId = maxIdDoc ? maxIdDoc.id : 0;

    const newProduct = { ...req.body, _id: new ObjectId(), id: ++maxId };
    const result = await db.collection(collectionName).insertOne(newProduct);
    res.status(201).send(result.ops[0]);
  } catch (error) {
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

// Update an existing product
app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = { $set: req.body };
    await client.connect();
    const result = await db
      .collection(collectionName)
      .updateOne({ _id: new ObjectId(productId) }, updatedData);
    if (result.matchedCount === 0) res.status(404).send("Product not found.");
    else res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await client.connect();
    const result = await db
      .collection(collectionName)
      .deleteOne({ _id: new ObjectId(productId) });
    if (result.deletedCount === 0) res.status(404).send("Product not found.");
    else res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});