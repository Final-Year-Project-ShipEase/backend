const express = require('express');
const router = express.Router();
const authTenantController = require('../controllers/authTenant');

router.post('/tenant/auth/login', authTenantController.createAccessToken);
router.get('/tenant/auth/protected', authTenantController.refreshAccessToken);

module.exports = router;
