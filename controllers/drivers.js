// controllers/driverController.js
const { Driver, Vehicle, DriverDetail, ShipmentVerification, Review } = require('../models');

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

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByPk(id);
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDriver = async (req, res) => {
  const { tenant_id, name, password, phoneNo, status } = req.body;
  try {
    const newDriver = await Driver.create({ tenant_id, name, password, phoneNo, status });
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDriver = async (req, res) => {
  const { id } = req.params;
  const { tenant_id, name, password, phoneNo, status } = req.body;
  try {
    const driver = await Driver.findByPk(id);
    if (driver) {
      await driver.update({ tenant_id, name, password, phoneNo, status });
      res.json(driver);
    } else {
      res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByPk(id);
    if (driver) {
      await driver.destroy();
      res.json({ message: 'Driver deleted successfully' });
    } else {
      res.status(404).json({ error: 'Driver not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete Index route with backend pagination of 10 results
exports.getDriversWithPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Driver.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ drivers: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with Vehicle
exports.getVehiclesForDriverWithPagination = async (req, res) => {
  const { driver_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Vehicle.findAndCountAll({
      where: { driver_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ vehicles: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with DriverDetail
exports.getDriverDetailsForDriverWithPagination = async (req, res) => {
  const { driver_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await DriverDetail.findAndCountAll({
      where: { driver_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ driverDetails: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with ShipmentVerification
exports.getShipmentVerificationsForDriverWithPagination = async (req, res) => {
  const { driver_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await ShipmentVerification.findAndCountAll({
      where: { driver_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ shipmentVerifications: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with Review
exports.getReviewsForDriverWithPagination = async (req, res) => {
  const { driver_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Review.findAndCountAll({
      where: { driver_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ reviews: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
