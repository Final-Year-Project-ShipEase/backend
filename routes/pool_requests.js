// routes/poolRequestRoutes.js
const express = require('express');
const router = express.Router();
const poolRequestController = require('../controllers/pool_requests');

module.exports = (app) => {
  router.get('/poolRequests', poolRequestController.getAllPoolRequests);
  router.get('/poolRequest/:id', poolRequestController.getPoolRequestById);
  router.post('/poolRequest', poolRequestController.createPoolRequest);
  router.put('/poolRequest/:id', poolRequestController.updatePoolRequest);
  router.delete(
    '/poolRequest/:id',
    poolRequestController.deletePoolRequestById
  );

  // Index route with backend pagination of 10 results
  router.get(
    '/poolRequests/index',
    poolRequestController.getPoolRequestsWithPagination
  );
};