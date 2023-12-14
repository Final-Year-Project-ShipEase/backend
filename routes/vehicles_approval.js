const express = require('express');
const router = express.Router();
const vehicleApprovalController = require('../controllers/vehicles_approval');

// Define routes
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

module.exports = router;
