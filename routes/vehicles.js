const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicles');
let multer = require('multer');
let upload = multer();

module.exports = (app) => {
  router.post('/vehicle', upload.fields([]), vehicleController.createVehicle);
  router.get('/vehicles', vehicleController.getAllVehicles);
  router.get('/vehicle/:id', vehicleController.getVehicleById);
  router.put('/vehicle/:id', vehicleController.updateVehicle);
  router.delete('/vehicle/:id', vehicleController.deleteVehicleById);

  // Index route with backend pagination
  router.get('/vehicles/index', vehicleController.indexVehicles);

  // Index route with backend pagination, associated with VehicleApprovals
  router.get(
    '/vehicles/:vehicle_id/vehicleApprovals/index',
    vehicleController.getVehicleApprovalsForVehicleWithPagination
  );

  router.get(
    '/vehicles/tenant/:tenant_id/index',
    vehicleController.getTenantForVehicleById
  );

  // Index route with backend pagination, associated with VehicleImages
  router.get(
    '/vehicles/:vehicle_id/vehicleImages/index',
    vehicleController.getVehicleImagesForVehicleWithPagination
  );

  app.use('/', router);
};
