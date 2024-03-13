// controllers/driverLicenseImagesController.js
const { DriverLicenseImages } = require('../models');

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

exports.getAllDriverLicenseImages = async (req, res) => {
  try {
    const driverLicenseImages = await DriverLicenseImages.findAll();
    res.json(driverLicenseImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDriverLicenseImagesById = async (req, res) => {
  const { driver_id } = req.params;
  try {
    const driverLicenseImages = await DriverLicenseImages.findOne({
      where: { driver_id },
    });
    if (driverLicenseImages) {
      res.json(driverLicenseImages);
    } else {
      res.status(404).json({ error: 'DriverLicenseImages not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDriverLicenseImages = async (req, res) => {
  const { driver_id, license, profilePicture } = req.body;
  const { role } = req.user;

  if (role != 'tenant') {
    return handleErrorResponse(res, 401, 'Token is not valid for Tenant');
  }
  try {
    const newDriverLicenseImages = await DriverLicenseImages.create({
      driver_id,
      license,
      profilePicture,
    });
    res.status(201).json(newDriverLicenseImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDriverLicenseImages = async (req, res) => {
  const { driver_id } = req.params;
  const { license, profilePicture } = req.body;
  const { role } = req.user;

  if (role != 'tenant') {
    return handleErrorResponse(res, 401, 'Token is not valid for Tenant');
  }
  try {
    const driverLicenseImages = await DriverLicenseImages.findOne({
      where: { driver_id },
    });
    if (driverLicenseImages) {
      await driverLicenseImages.update({ license, profilePicture });
      res.json(driverLicenseImages);
    } else {
      res.status(404).json({ error: 'DriverLicenseImages not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDriverLicenseImagesById = async (req, res) => {
  const { driver_id } = req.params;
  const { role } = req.user;

  if (role != 'tenant') {
    return handleErrorResponse(res, 401, 'Token is not valid for Tenant');
  }
  try {
    const driverLicenseImages = await DriverLicenseImages.findOne({
      where: { driver_id },
    });
    if (driverLicenseImages) {
      await driverLicenseImages.destroy();
      res.json({ message: 'DriverLicenseImages deleted successfully' });
    } else {
      res.status(404).json({ error: 'DriverLicenseImages not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete Index route with backend pagination of 10 results
exports.getDriverLicenseImagesForDriverWithPagination = async (req, res) => {
  const { driver_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await DriverLicenseImages.findAndCountAll({
      where: { driver_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ driverLicenseImages: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
