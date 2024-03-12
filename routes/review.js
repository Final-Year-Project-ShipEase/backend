// routes/reviewsRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');

module.exports = (app) => {
  router.get('/reviews', reviewController.getAllReviews);
  router.get('/review/:id', reviewController.getReviewById);
  router.post('/review', reviewController.createReview);
  router.put('/review/:id', reviewController.updateReview);
  router.delete('/review/:id', reviewController.deleteReviewById);

  app.use('/', router);
};