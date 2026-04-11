const express = require('express');
const router = express.Router();
const logger = require('../middleware/logger.middleware.js');

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/user.controller');


// Apply logger middleware to all routes in this router
// router.use(logger);

// CRUD routes
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', logger, getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;