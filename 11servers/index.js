const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');

// Step 1: Connect to MongoDB
// Step 2: Define a User schema
// Step 3: Define models

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authDb')
    .then(() => {
        console.log('Connected to MongoDB');
    }
    ).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

// model
const User = mongoose.model('User', userSchema);

// Registration (Post)

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({ "name": name, "email": email, "password": hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Your account has been created successfully" });
    }
    catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: "Something went wrong, please try again later" });
    }
});

// Login (Post)

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User with this email is not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful" });
    }
    catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: "Something went wrong, please try again later" });
    }
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});