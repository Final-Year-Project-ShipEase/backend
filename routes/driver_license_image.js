// routes/driverLicenseImagesRoutes.js
const express = require('express');
const router = express.Router();
const driverLicenseImagesController = require('../controllers/driver_license_images');
const TokenValidator = require('../middleware/tokenValidator');

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
    TokenValidator,
    driverLicenseImagesController.createDriverLicenseImages
  );
  router.put(
    '/driverLicenseImage/:driver_id',
    TokenValidator,
    driverLicenseImagesController.updateDriverLicenseImages
  );
  router.delete(
    '/driverLicenseImage/:driver_id',
    TokenValidator,
    driverLicenseImagesController.deleteDriverLicenseImagesById
  );

  // Index route with backend pagination of 10 results, associated with Driver
  router.get(
    '/drivers/:driver_id/driverLicenseImages/index',
    driverLicenseImagesController.getDriverLicenseImagesForDriverWithPagination
  );

  app.use('/', router);
};
