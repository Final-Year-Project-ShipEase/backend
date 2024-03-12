const express = require('express');
const router = express.Router();
const authAdminController = require('../controllers/authAdmin');

module.exports = (app) => {
  router.get('/admin/auth/refresh', authAdminController.refreshAccessToken);
  router.post('/admin/auth/login', authAdminController.createAccessToken);
  router.get('/admin/auth/verify', authAdminController.verifyAccessToken);
  router.get('/admin/updatePassword', authAdminController.updatePassword);
};