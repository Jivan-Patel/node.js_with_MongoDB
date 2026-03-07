const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());


// connect with database
mongoose.connect("mongodb+srv://pateljivancg_db_user:jivan%4005@cluster0.fnrewcm.mongodb.net/day8")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [ 2, "Name should be at least 2 characters long" ]
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        lowercase: true,
        unique: [true, "This Email already exists"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password should be at least 6 characters long"]
    },
    role: {
        type: String,
        enum: ["admin", "student", "mentor"],
        default: "student"
    }
});
const users = mongoose.model("user", userSchema);


app.get("/users", async (req, res) => {
    const data = await users.find();
    if (data === null) {
        return res.status(500).json({ 'error': error.message });
    }
    res.status(200).json(data);
});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id
    const user = await users.findOne({"_id": id});
    if (user == null) {
        return res.status(404).json({ 'error': "User not found" });
    }
    res.status(200).json(user);
});


app.post("/addUser", async (req, res) => {
    try {
        const newUser = new users(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ "error": error.message });
    };
});

app.post("/addUsers", async (req, res) => {
    try {
        const newUsers = await users.insertMany(req.body);
        res.status(201).json(newUsers);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ "error": error.message });
    };
});


app.listen(3000, () => {
    console.log("server started at 3000")
})