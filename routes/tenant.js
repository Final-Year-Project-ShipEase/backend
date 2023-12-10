// routes/tenantsRoutes.js
const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant');

router.get('/tenants', tenantController.getAllTenants);
router.get('/tenant/:id', tenantController.getTenantById);
router.post('/tenant', tenantController.createTenant);
router.put('/tenant/:id', tenantController.updateTenant);
router.delete('/tenant/:id', tenantController.deleteTenantById);

module.exports = router;
