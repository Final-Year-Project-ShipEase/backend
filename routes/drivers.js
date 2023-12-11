// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const driverController = require('../controllers/drivers');

router.get('/drivers', driverController.getAllDrivers);
router.get('/driver/:id', driverController.getDriverById);
router.post('/driver', driverController.createDriver);
router.put('/driver/:id', driverController.updateDriver);
router.delete('/driver/:id', driverController.deleteDriverById);

// Index route with backend pagination of 10 results
router.get('/drivers/index', driverController.getDriversWithPagination);

// Index route with backend pagination of 10 results, associated with Vehicle
router.get(
  '/drivers/:driver_id/vehicles/index',
  driverController.getVehiclesForDriverWithPagination
);

router.get(
  '/drivers/tenant/:tenant_id/index',
  driverController.getTenantForDriverById
);

// Index route with backend pagination of 10 results, associated with DriverDetail
router.get(
  '/drivers/:driver_id/driverDetails/index',
  driverController.getDriverDetailsForDriverWithPagination
);

// Index route with backend pagination of 10 results, associated with ShipmentVerification
router.get(
  '/drivers/:driver_id/shipmentVerifications/index',
  driverController.getShipmentVerificationsForDriverWithPagination
);

// Index route with backend pagination of 10 results, associated with Review
router.get(
  '/drivers/:driver_id/reviews/index',
  driverController.getReviewsForDriverWithPagination
);

module.exports = router;
