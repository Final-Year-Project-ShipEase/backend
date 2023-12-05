const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles');

// Define routes
router.post('/vehicle', vehicleController.createVehicle);
router.get('/vehicles', vehicleController.getAllVehicles);
router.get('/vehicle/:id', vehicleController.getVehicleById);
router.put('/vehicle/:id', vehicleController.updateVehicle);
router.delete('/vehicle/:id', vehicleController.deleteVehicleById);

// Index route with backend pagination
router.get('/vehicles/index', vehicleController.indexVehicles);

// Index route with backend pagination, associated with VehicleDetails
router.get(
  '/vehicles/:vehicle_id/vehicleDetails/index',
  vehicleController.getVehicleDetailsForVehicleWithPagination
);

// Index route with backend pagination, associated with VehicleApprovals
router.get(
  '/vehicles/:vehicle_id/vehicleApprovals/index',
  vehicleController.getVehicleApprovalsForVehicleWithPagination
);

// Index route with backend pagination, associated with VehicleImages
router.get(
  '/vehicles/:vehicle_id/vehicleImages/index',
  vehicleController.getVehicleImagesForVehicleWithPagination
);
module.exports = router;
