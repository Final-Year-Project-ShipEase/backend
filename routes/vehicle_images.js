const express = require('express');
const router = express.Router();
const vehicleImageController = require('../controllers/vehicle_images');

// Define routes
router.post('/vehicleImages', vehicleImageController.createVehicleImages);
router.get('/vehicleImages', vehicleImageController.getAllVehicleImages);
router.get('/vehicleImage/:id', vehicleImageController.getVehicleImagesById);
router.put('/vehicleImage/:id', vehicleImageController.updateVehicleImages);
router.delete(
  '/vehicleImage/:id',
  vehicleImageController.deleteVehicleImagesById
);

module.exports = router;
