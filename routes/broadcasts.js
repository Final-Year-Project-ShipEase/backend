// routes/broadcastRoutes.js
const express = require('express');
const router = express.Router();
const broadcastController = require('../controllers/broadcasts');
module.exports = (app) => {
router.get('/broadcasts', broadcastController.getAllBroadcasts);
router.get('/broadcast/:id', broadcastController.getBroadcastById);
router.post('/broadcast', broadcastController.createBroadcast);
router.put('/broadcast/:id', broadcastController.updateBroadcast);
router.delete('/broadcast/:id', broadcastController.deleteBroadcastById);

// Index route with backend pagination of 10 results
router.get(
  '/broadcasts/index',
  broadcastController.getBroadcastsWithPagination
);

// Index route with backend pagination of 10 results, associated with a specific tenant
router.get(
  '/tenants/:tenant_id/broadcasts/index',
  broadcastController.getBroadcastsForTenantWithPagination
);
}
