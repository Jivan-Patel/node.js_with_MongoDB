const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware.js');

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/user.controller');


// CRUD routes
router.post('/', createUser);
router.get('/', auth, getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;