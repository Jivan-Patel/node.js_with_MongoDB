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


app.listen(3000, () => {
    console.log("server started at 3000")
});