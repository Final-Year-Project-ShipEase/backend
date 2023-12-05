// controllers/driverDetailController.js
const { DriverDetail, Driver } = require('../models');

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

exports.getAllDriverDetails = async (req, res) => {
  try {
    const driverDetails = await DriverDetail.findAll();
    res.json(driverDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDriverDetailById = async (req, res) => {
  const { driver_id } = req.params;
  try {
    const driverDetail = await DriverDetail.findByPk(driver_id);
    if (driverDetail) {
      res.json(driverDetail);
    } else {
      res.status(404).json({ error: 'DriverDetail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDriverDetail = async (req, res) => {
  const { driver_id, city, cnic, liscence, trackerNo } = req.body;
  try {
    const newDriverDetail = await DriverDetail.create({ driver_id, city, cnic, liscence, trackerNo });
    res.status(201).json(newDriverDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDriverDetail = async (req, res) => {
  const { driver_id } = req.params;
  const { city, cnic, liscence, trackerNo } = req.body;
  try {
    const driverDetail = await DriverDetail.findByPk(driver_id);
    if (driverDetail) {
      await driverDetail.update({ city, cnic, liscence, trackerNo });
      res.json(driverDetail);
    } else {
      res.status(404).json({ error: 'DriverDetail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDriverDetailById = async (req, res) => {
  const { driver_id } = req.params;
  try {
    const driverDetail = await DriverDetail.findByPk(driver_id);
    if (driverDetail) {
      await driverDetail.destroy();
      res.json({ message: 'DriverDetail deleted successfully' });
    } else {
      res.status(404).json({ error: 'DriverDetail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete Index route with backend pagination of 10 results
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
