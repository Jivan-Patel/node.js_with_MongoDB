const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;


app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test")
    .then(() => console.log("MongoDB Connected successfully"))
    .catch((error) => console.log("Connection failed", error));

app.get("/", (req, res) => {
    res.send("Server is running...");
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

app.post('/addUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ 'message': "err.message" });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});