// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/bookings', bookingController.getAllBookings);
router.get('/booking/:id', bookingController.getBookingById);
router.post('/booking', bookingController.createBooking);
router.put('/booking/:id', bookingController.updateBooking);
router.delete('/booking/:id', bookingController.deleteBookingById);

// Index route with backend pagination of 10 results
router.get('/bookings/index', bookingController.getBookingsWithPagination);

// Index route with backend pagination of 10 results, associated with PoolRequest
router.get(
  '/bookings/:booking_id/poolRequests/index',
  bookingController.getPoolRequestsForBookingWithPagination
);

// Index route with backend pagination of 10 results, associated with Payment
router.get(
  '/bookings/:booking_id/payments/index',
  bookingController.getPaymentsForBookingWithPagination
);

module.exports = router;
