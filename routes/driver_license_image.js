// routes/driverLicenseImagesRoutes.js
const express = require('express');
const router = express.Router();
const driverLicenseImagesController = require('../controllers/driver_license_images');

module.exports = (app) => {
  router.get(
    '/driverLicenseImages',
    driverLicenseImagesController.getAllDriverLicenseImages
  );
  router.get(
    '/driverLicenseImage/:driver_id',
    driverLicenseImagesController.getDriverLicenseImagesById
  );
  router.post(
    '/driverLicenseImage',
    driverLicenseImagesController.createDriverLicenseImages
  );
  router.put(
    '/driverLicenseImage/:driver_id',
    driverLicenseImagesController.updateDriverLicenseImages
  );
  router.delete(
    '/driverLicenseImage/:driver_id',
    driverLicenseImagesController.deleteDriverLicenseImagesById
  );

  // Index route with backend pagination of 10 results, associated with Driver
  router.get(
    '/drivers/:driver_id/driverLicenseImages/index',
    driverLicenseImagesController.getDriverLicenseImagesForDriverWithPagination
  );
};
