// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

module.exports = (app) => {
  router.get('/users', userController.getAllUsers);
  router.get('/user/:id', userController.getUserById);
  router.post('/user', userController.createUser);
  router.put('/user/:id', userController.updateUser);
  router.delete('user/:id', userController.deleteUserById);
  router.get('/users/index', userController.getUsersWithPagination);

  app.use('/', router);
};
