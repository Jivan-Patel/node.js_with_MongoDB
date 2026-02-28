const express = require('express'); 
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3000;



// middleware 
app.use(express.json());


// connect with database 
mongoose.connect('mongodb://localhost:27017/Day4Lab2')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
})



// Define a schema and model for the data you want to store 
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
},
{versionKey: false},
);


const User = mongoose.model('User', userSchema);   /// collection name will be users 

// Create a new user


app.post('/add-users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  }
    catch (err) {
    res.status(400).send(err);
  }
});


// Get all users 
app.get('/get-users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
    } catch (err) {
    res.status(500).send(err);
    }
});




// ================================

// Get a user by ID 
app.get('/get-users/:id', async (req, res) => {

const userId = req.params.id; 
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }   
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

//   =======================================



app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// ==================================================

// Start the server 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});