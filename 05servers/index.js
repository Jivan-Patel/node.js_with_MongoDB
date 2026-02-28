const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/day5")
    .then(() => console.log("MongoDB Connected successfully"))
    .catch((error) => console.log("Connection failed ", error));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const users = mongoose.model('users', userSchema);

app.get('/', (req, res) => {
    res.send("Server is running...");
})

app.get("/users", async (req, res) => {
    const data = await users.find();
    if (data === null) {
        return res.status(500).json({ 'error': error });
    }
    res.status(200).json(data);
});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id
    const user = await users.findOne({"_id": id});
    if (user == []) {
        return res.status(404).json({ 'error': "User not found" });
    }
    res.status(200).json(user);
});

app.get("/users/:email", async (req, res) => {
    const email = req.params.email
    const user = await users.findOne({"email": email});
    if (user == []) {
        return res.status(404).json({ 'error': "User not found" });
    }
    res.status(200).json(user);
});

app.post("/addUser", async (req, res) => {
    try {
        const newUser = users(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ "error": error });
    };
});

app.post("/addUsers", async (req, res) => {
    try {
        const newUsers = await users.insertMany(req.body);
        res.status(201).json(newUsers);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ "error": error });
    };
});

app.put("/updateUser/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await users.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ 'error': "User not found" });
        }       
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ "error": error });
    };
});

app.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await users.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ 'error': "User not found" });
        }
        res.status(200).json({ "message": "User deleted successfully", "Deleted User": deletedUser });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ "error": error });
    };
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});