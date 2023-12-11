const express = require('express');
const router = express.Router();
const vehicleImageController = require('../controllers/vehicle_images');

// Define routes
router.post('/vehicleImage', vehicleImageController.createVehicleImage);
router.get('/vehicleImages', vehicleImageController.getAllVehicleImages);
router.get('/vehicleImage/:id', vehicleImageController.getVehicleImageById);
router.put('/vehicleImage/:id', vehicleImageController.updateVehicleImage);
router.delete(
  '/vehicleImage/:id',
  vehicleImageController.deleteVehicleImageById
);

module.exports = router;
