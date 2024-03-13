const express = require('express');
const router = express.Router();
const vehicleApprovalController = require('../controllers/vehicles_approval');
const TokenValidator = require('../middleware/tokenValidator');

module.exports = (app) => {
  router.post(
    '/vehicleApproval',
    TokenValidator,
    vehicleApprovalController.createVehicleApproval
  );
  router.get(
    '/vehicleApprovals',
    vehicleApprovalController.getAllVehicleApprovals
  );
  router.get(
    '/vehicleApproval/:id',
    vehicleApprovalController.getVehicleApprovalById
  );
  router.put(
    '/vehicleApproval/:id',
    TokenValidator,
    vehicleApprovalController.updateVehicleApproval
  );
  router.delete(
    '/vehicleApproval/:id',
    TokenValidator,
    vehicleApprovalController.deleteVehicleApprovalById
  );

  router.get(
    '/vehicleApprovals/rejected',
    vehicleApprovalController.getRejectedVehicleApprovals
  );

  app.use('/', router);
};