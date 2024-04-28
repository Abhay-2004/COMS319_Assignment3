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

// Initialize database connection once
let db;

async function connectToMongo() {
    if (!db) {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    }
}

// Connect to MongoDB when the server starts
connectToMongo().catch(err => console.error("Failed to connect to MongoDB:", err));

app.get("/products", async (req, res) => {
    try {
        await connectToMongo();
        const products = await db.collection(collectionName).find({}).toArray();
        if (products.length > 0) {
            res.status(200).send(products);
        } else {
            res.status(404).send("No products found.");
        }
    } catch (error) {
        console.error("Failed to fetch products", error);
        res.status(500).send({ error: "An internal server error occurred while fetching products." });
    }
});

app.post("/products", async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: "Bad request: No data provided." });
    }

    await connectToMongo();
    try {
        const collection = db.collection(collectionName);
        const maxIdDoc = await collection.findOne({}, { sort: { id: -1 } });
        const maxId = maxIdDoc ? maxIdDoc.id : 0;
        const newId = maxId + 1;
        const newProduct = { ...req.body, id: newId, _id: new ObjectId() };

        const result = await collection.insertOne(newProduct);
        if (result.acknowledged) {
            res.status(201).send(newProduct);  // Send back the newly created product
        } else {
            throw new Error('Insert failed');
        }
    } catch (error) {
        console.error("Error adding new product:", error);
        res.status(500).send({ error: "An internal server error occurred while adding product." });
    }
});

// Get a single product by ID (using the numerical id instead of _id)
app.get("/products/:id", async (req, res) => {
    try {
        await connectToMongo();
        const productId = req.params.id;
        const query = { id: parseInt(productId) };
        const product = await db.collection(collectionName).findOne(query);
        if (!product) {
            res.status(404).send("Product not found");
        } else {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(500).send({ error: "An internal server error occurred while fetching product." });
    }
});

// Update an existing product by ID (using the numerical id instead of _id)
app.put("/products/:id", async (req, res) => {
    try {
        await connectToMongo();
        const productId = parseInt(req.params.id);
        const { title, price, description, rating } = req.body;
        const updatedData = { 
            $set: {
                title, 
                price, 
                description, 
                "rating.rate": rating.rate, 
                "rating.count": rating.count
            } 
        };
        const query = { id: productId };
        const result = await db.collection(collectionName).updateOne(query, updatedData);
        if (result.matchedCount === 0) {
            res.status(404).send("Product not found.");
        } else {
            res.status(200).send({ message: "Product updated successfully", data: result });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({ error: "An internal server error occurred while updating product." });
    }
});

// Delete a product by numerical ID
app.delete("/products/:id", async (req, res) => {
    try {
        await connectToMongo();
        const productId = parseInt(req.params.id);
        const query = { id: productId };
        const result = await db.collection(collectionName).deleteOne(query);
        if (result.deletedCount === 0) {
            res.status(404).send("Product not found.");
        } else {
            res.status(200).send({ message: "Product deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ error: "An internal server error occurred while deleting the product." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://${host}:${port}`);
});
