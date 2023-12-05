// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('user/:id', userController.deleteUserById);

module.exports = router;