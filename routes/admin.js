// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const TokenValidator = require('../middleware/tokenValidator');

module.exports = (app) => {
  router.get('/admins', adminController.getAllAdmins);
  router.get('/admin/:id', adminController.getAdminById);
  router.post('/admin', adminController.createAdmin);
  router.put('/admin/:id', TokenValidator, adminController.updateAdmin);
  router.delete('/admin/:id', TokenValidator, adminController.deleteAdminById);
  router.post('/adminlogin', adminController.getUserData);
  app.use('/', router);
};
