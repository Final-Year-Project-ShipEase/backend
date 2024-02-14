const express = require('express');
const router = express.Router();
const authAdminController = require('../controllers/authAdmin');

router.post('/admin/auth/login', authAdminController.createAccessToken);
router.get('/admin/auth/refresh', authAdminController.refreshAccessToken);
router.get('/admin/auth/verify', authAdminController.verifyAccessToken);

module.exports = router;