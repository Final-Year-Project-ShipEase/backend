const express = require('express');
const router = express.Router();
const vehicleApprovalController = require('../controllers/vehicles_approval');

module.exports = (app) => {
  router.post(
    '/vehicleApproval',
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
    vehicleApprovalController.updateVehicleApproval
  );
  router.delete(
    '/vehicleApproval/:id',
    vehicleApprovalController.deleteVehicleApprovalById
  );

  router.get(
    '/vehicleApprovals/rejected',
    vehicleApprovalController.getRejectedVehicleApprovals
  );

  app.use('/', router);
};