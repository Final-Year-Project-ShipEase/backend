// controllers/bookingController.js
const { Booking, PoolRequest, Payment } = require('../models');

const calculatePagination = (totalItems, pageSize, currentPage) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  return {
    totalItems,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
  };
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  const {
    tenant_id,
    user_id,
    vehicle_id,
    pickup,
    dropoff,
    status,
    date,
    total_bill,
  } = req.body;
  try {
    const newBooking = await Booking.create({
      tenant_id,
      user_id,
      vehicle_id,
      pickup,
      dropoff,
      status,
      date,
      total_bill,
    });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const {
    tenant_id,
    user_id,
    vehicle_id,
    pickup,
    dropoff,
    status,
    date,
    total_bill,
  } = req.body;
  try {
    const booking = await Booking.findByPk(id);
    if (booking) {
      await booking.update({
        tenant_id,
        user_id,
        vehicle_id,
        pickup,
        dropoff,
        status,
        date,
        total_bill,
      });
      res.json(booking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (booking) {
      await booking.destroy();
      res.json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete Index route with backend pagination of 10 results
exports.getBookingsWithPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Booking.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ bookings: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with PoolRequest
exports.getPoolRequestsForBookingWithPagination = async (req, res) => {
  const { booking_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await PoolRequest.findAndCountAll({
      where: { booking_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ poolRequests: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with Payment
exports.getPaymentsForBookingWithPagination = async (req, res) => {
  const { booking_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Payment.findAndCountAll({
      where: { booking_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ payments: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get bookings by tenant id
exports.getBookingByTenantId = async (req, res) => {
  const { tenant_id } = req.params;
  try {
    const bookings = await Booking.findAll({ where: { tenant_id } });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};