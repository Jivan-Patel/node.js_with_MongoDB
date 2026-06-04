const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware.js');

const { getAllUsers } = require('../controllers/user.controller');


// CRUD routes
router.get('/', auth, getAllUsers);

module.exports = router;