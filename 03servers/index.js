const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/userDetails")
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

app.post("/addUser", async (req, res) => {
    try {
        const user = User(req.body);
        await user.save();
        res.status(201).json(user);
    }
    catch(error) {
        console.log(error);
        res.status(404).json({"error": error});
    };
});

app.post("/addUsers", async (req, res) => {
    try {
        const users = await User.insertMany(req.body);
        res.status(201).json(users);
    }
    catch(error) {
        console.log(error);
        res.status(404).json({"error": error});
    };
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});