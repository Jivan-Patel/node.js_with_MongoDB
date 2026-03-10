const express = require('express');
const { default: mongoose, Types } = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/day10")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err))

const productSchema = mongoose.Schema({
    "title": {
        type: String,
        required: [true, "Title of product is required"]
    },
    "brand": {
        type: String,
        required: [true, "Brand of product is required"]
    },
    "price": {
        type: Number,
        required: [true, "Price of product is required"]
    },
    "category": {
        type: String,
        required: [true, "Category of product is required"]
    }
});

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.post("/products", async (req, res) => {
    const prod = {
        "title": req.body.title,
        "price": Number(req.body.price),
        "category": req.body.category
    }
    try {
        const NewProduct = new Product(prod);
        await NewProduct.save();
        res.status(201).json(prod);
    }
    catch (error) {
        return res.status(404).json(error.message);
    }
})

app.get("/products/id/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return req.status(404).send("Product not found");
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(404).json(error);
    }
})

app.get("/get-products", async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return req.status(404).send("Product not found");
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(404).json(error);
    }
})

// Query Parameters

app.get("/categoryProducts", async (req, res) => {
    try {
        const category = req.query;
        console.log(category)
        const products = await Product.find(category)
        res.status(200).json(products);
    }
    catch (error) {
        res.status(404).json(error);
    }
})

app.get("/brandProducts", async (req, res) => {
    try {
        const brand = req.query.brand;
        const products = await Product.find({ "brand": brand })
        res.status(200).json(products);
    }
    catch (error) {
        res.status(404).json(error);
    }
})


app.get("/products", async (req, res) => {
    try {
        const { brand, category } = req.query;
        let filter = {};
        if(brand) {
            filter.brand = brand;
        }
        if(category) {
            filter.category = category;
        }
        const products = await Product.find(filter)
        res.status(200).json(products);
    }
    catch (error) {
        res.status(404).json(error);
    }
})

app.listen(3000, () => {
    console.log("server started at 3000")
});