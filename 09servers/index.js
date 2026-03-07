const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/students")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

app.get("/", (req, res) => {
    res.send("Server is running...");
});

const studentSchema = new mongoose.Schema({
    "name": {
        type: String,
        minlength: 3,
        required: true
    },
    "email": {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        minlength: 6,
        required: true,
    },
    "age": {
        type: Number,
        required: true,
        min: 18,
    },
    "role": {
        type: String,
        enum: ["Student", "Mentor", "Admin"],
        default: "Student"
    },
    "course": {
        type: String,
        enum: ["MERN", "Java", "Python", "Data Science"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {versionKey: false});
const students = mongoose.model("student", studentSchema);

app.post("/students", async (req, res) => {
    try {
        const newStudents = new students(req.body);
        await newStudents.save();
        res.status(201).json(newStudents);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ "error": error.message });
    };
});
app.post("/students/bulk", async (req, res) => {
    try {
        const newStudents = await students.insertMany(req.body);
        res.status(201).json(newStudents);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ "error": error.message });
    };
});

app.get("/students", async (req, res) => {
    try {
        const allStudents = await students.find();
        res.status(201).json(allStudents);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ "error": error.message });
    };
});

app.get("/students/:id", async (req, res) => {
    const id = req.params.id;
    const reqStudent = await students.findOne({ "_id": id });
    if (reqStudent) {
        return res.status(200).json(reqStudent);
    }
    else {
        return res.status(404).json({ "error": "Student not found" });
    }
});

app.get("/students/course/:courseName", async (req, res) => {
    const course = req.params.courseName;
    const reqStudents = await students.find({ "course": course });
    if (reqStudents.length > 0) {
        return res.status(200).json(reqStudents);
    }
    else {
        return res.status(404).json({ "error": "There is no students enrolled in given course" });
    }
});

app.put("/students/:id", async (req, res) => {
    const id = req.params.id;
    const reqStudent = await students.updateOne({ "_id": id }, req.body );
    if (reqStudent) {
        return res.status(201).json(reqStudent);
    }
    else {
        return res.status(404).json({ "error": "Student not found" });
    }
});

app.delete("/students/:id", async (req, res) => {
    const id = req.params.id;
    const reqStudent = await students.deleteOne({ "_id": id });
    if (reqStudent) {
        return res.status(202).json(reqStudent);
    }
    else {
        return res.status(404).json({ "error": "Student with given id is not found" });
    }
});

app.listen(3000, () => {
    console.log("server started at 3000")
});