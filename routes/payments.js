// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payments');

module.exports = (app) => {
  router.get('/payments', paymentController.getAllPayments);
  router.get('/payment/:id', paymentController.getPaymentById);
  router.post('/payment', paymentController.createPayment);
  router.put('/payment/:id', paymentController.updatePayment);
  router.delete('/payment/:id', paymentController.deletePaymentById);

  app.use('/', router);
};
