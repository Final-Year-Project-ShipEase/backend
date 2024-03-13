const express = require('express');
const router = express.Router();
const vehicleImageController = require('../controllers/vehicle_images');
const TokenValidator = require('../middleware/tokenValidator');

module.exports = (app) => {
  router.post(
    '/vehicleImage',
    TokenValidator,
    vehicleImageController.createVehicleImage
  );
  router.get('/vehicleImages', vehicleImageController.getAllVehicleImages);
  router.get('/vehicleImage/:id', vehicleImageController.getVehicleImageById);
  router.put(
    '/vehicleImage/:id',
    TokenValidator,
    vehicleImageController.updateVehicleImage
  );
  router.delete(
    '/vehicleImage/:id',
    TokenValidator,
    vehicleImageController.deleteVehicleImageById
  );

  app.use('/', router);
};