// routes/driverDetailRoutes.js
const express = require('express');
const router = express.Router();
const driverDetailController = require('../controllers/driver_details');

router.get('/driverDetails', driverDetailController.getAllDriverDetails);
router.get(
  '/driverDetail/:driver_id',
  driverDetailController.getDriverDetailById
);
router.post('/driverDetail', driverDetailController.createDriverDetail);
router.put(
  '/driverDetail/:driver_id',
  driverDetailController.updateDriverDetail
);
router.delete(
  '/driverDetail/:driver_id',
  driverDetailController.deleteDriverDetailById
);

// Index route with backend pagination of 10 results, associated with Driver
router.get(
  '/drivers/:driver_id/driverDetails/index',
  driverDetailController.getDriverDetailsForDriverWithPagination
);

module.exports = router;
