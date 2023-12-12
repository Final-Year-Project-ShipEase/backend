const express = require('express');
const router = express.Router();
const authAdminController = require('../controllers/authAdmin');

router.post('/admin/auth/login', authAdminController.createAccessToken);
router.get('/admin/auth/protected', authAdminController.getAccessToken);

module.exports = router;