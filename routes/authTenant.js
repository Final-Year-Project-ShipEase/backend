const express = require('express');
const router = express.Router();
const authTenantController = require('../controllers/authTenant');

module.exports = (app) => {
router.post('login', authTenantController.createAccessToken);
router.get('refresh', authTenantController.refreshAccessToken);
router.get('verify', authTenantController.verifyAccessToken);
app.use('/tenant/auth/', router);
};
