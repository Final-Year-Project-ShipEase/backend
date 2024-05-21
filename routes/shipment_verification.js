// routes/shipmentVerificationRoutes.js
const express = require('express');
const router = express.Router();
const shipmentVerificationController = require('../controllers/shipment_verification');

module.exports = (app) => {
  router.get(
    '/shipmentVerifications',
    shipmentVerificationController.getAllShipments
  );
  router.get(
    '/shipmentVerification/:id',
    shipmentVerificationController.getShipmentById
  );
  router.post(
    '/shipmentVerification',
    shipmentVerificationController.createShipment
  );
  router.put(
    '/shipmentVerification/:id',
    shipmentVerificationController.updateShipment
  );
  router.delete(
    '/shipmentVerification/:id',
    shipmentVerificationController.deleteShipmentById
  );

  app.use('/', router);
};
