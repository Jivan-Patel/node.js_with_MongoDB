const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
app.use(express.json());

mongoose.connect("mongodb+srv://pateljivancg_db_user:jivan%4005@cluster0.fnrewcm.mongodb.net/test")
    .then(() => console.log("MongoDB Connected successfully"))
    .catch((error) => console.log("Connection failed ", error));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }

}, { timestamps: true, versionKey: false });

const users = mongoose.model('users', userSchema);

app.get('/', (req, res) => {
    res.send("Server is running...");
});
app.get("/users", async (req, res) => {
    const data = await users.find();
    if (data === null) {
        return res.status(500).json({ 'error': error });
    }
    res.status(200).json(data);
});
app.get("/users/:id", async (req, res) => {
    const id = req.params.id
    const user = await users.findOne({ "_id": id });
    if (user == null) {
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

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});