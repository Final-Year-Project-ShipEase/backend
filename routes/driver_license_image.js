// routes/driverLicenseImagesRoutes.js
const express = require('express');
const router = express.Router();
const driverLicenseImagesController = require('../controllers/driver_license_images');

router.get(
  '/driverLicenseImages',
  driverLicenseImagesController.getAllDriverLicenseImages
);
router.get(
  '/driverLicenseImages/:driver_id',
  driverLicenseImagesController.getDriverLicenseImagesById
);
router.post(
  '/driverLicenseImages',
  driverLicenseImagesController.createDriverLicenseImages
);
router.put(
  '/driverLicenseImages/:driver_id',
  driverLicenseImagesController.updateDriverLicenseImages
);
router.delete(
  '/driverLicenseImages/:driver_id',
  driverLicenseImagesController.deleteDriverLicenseImagesById
);

// Index route with backend pagination of 10 results, associated with Driver
router.get(
  '/drivers/:driver_id/driverLicenseImages/index',
  driverLicenseImagesController.getDriverLicenseImagesForDriverWithPagination
);

module.exports = router;
