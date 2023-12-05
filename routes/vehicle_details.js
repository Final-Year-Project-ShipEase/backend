const express = require('express');
const router = express.Router();
const vehicleDetailController = require('../controllers/vehicle_details');

// Define routes
router.post('/vehicleDetail', vehicleDetailController.createVehicleDetail);
router.get('/vehicleDetails', vehicleDetailController.getAllVehicleDetails);
router.get('/vehicleDetail/:id', vehicleDetailController.getVehicleDetailById);
router.put('/vehicleDetail/:id', vehicleDetailController.updateVehicleDetail);
router.delete(
  '/vehicleDetail/:id',
  vehicleDetailController.deleteVehicleDetailById
);

module.exports = router;
