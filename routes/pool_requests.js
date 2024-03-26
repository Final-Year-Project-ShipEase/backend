// routes/poolRequestRoutes.js
const express = require('express');
const router = express.Router();
const poolRequestController = require('../controllers/pool_requests');
const TokenValidator = require('../middleware/tokenValidator');

module.exports = (app) => {
  router.get('/poolRequests', poolRequestController.getAllPoolRequests);
  router.get('/poolRequest/:id', poolRequestController.getPoolRequestById);
  router.post(
    '/poolRequest',
    // TokenValidator,
    poolRequestController.createPoolRequest
  );
  router.put(
    '/poolRequest/:id',
    // TokenValidator,
    poolRequestController.updatePoolRequest
  );
  router.delete(
    '/poolRequest/:id',
    // TokenValidator,
    poolRequestController.deletePoolRequestById
  );

  // Index route with backend pagination of 10 results
  router.get(
    '/poolRequests/index',
    poolRequestController.getPoolRequestsWithPagination
  );

  app.use('/', router);
};