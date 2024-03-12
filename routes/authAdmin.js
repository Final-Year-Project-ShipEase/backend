const express = require('express');
const router = express.Router();
const authAdminController = require('../controllers/authAdmin');

module.exports = (app) => {
  router.get('refresh', authAdminController.refreshAccessToken);
  router.post('login', authAdminController.createAccessToken);
  router.get('verify', authAdminController.verifyAccessToken);
  router.get('updatePassword', authAdminController.updatePassword);
  app.use('/admin/auth/', router);
};