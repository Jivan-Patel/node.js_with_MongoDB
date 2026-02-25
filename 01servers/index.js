const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;


app.use(express.json());

mongoose.connect("mongodb://localhost:27017/flipkart")
    .then(() => console.log("MongoDB Connected successfully"))
    .catch((error) => console.log("Connection failed", error));

const userSchema = new mongoose.Schema({});
const User = mongoose.model("users", userSchema);

const ordersSchema = new mongoose.Schema({});
const Orders = mongoose.model("orders", ordersSchema);



app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.get("/users", async (req, res) => {
    try {
        const data = await User.find({});
        res.json(data);
    }
    catch(error) {
        res.status(500).json({'error': error});
    }
});
app.get("/orders", async (req, res) => {
    try {
        const data = await Orders.find({});
        res.json(data);
    }
    catch(error) {
        res.status(500).json({'error': error});
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});