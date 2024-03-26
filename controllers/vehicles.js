const {
  Vehicle,
  VehicleDetail,
  VehicleApproval,
  VehicleImages,
} = require('../models');

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

// Create a new vehicle
const createVehicle = async (req, res) => {
  const {
    tenant_id,
    driver_id,
    type,
    regNo,
    status,
    location,
    trackerNo,
    ownerCnic,
  } = req.body;

  const binaryImageData = Buffer.from(req.body.image, 'base64');

  try {
    const vehicle = await Vehicle.create({
      tenant_id,
      driver_id,
      type: [type],
      regNo,
      status,
      location,
      trackerNo,
      ownerCnic,
      image: binaryImageData,
    });
    return res.status(201).json(vehicle);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get vehicle by ID
const getVehicleById = async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    return res.status(200).json(vehicle);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update vehicle by ID
const updateVehicle = async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const [updatedRows] = await Vehicle.update(req.body, {
      where: { id: vehicleId },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    const updatedVehicle = await Vehicle.findByPk(vehicleId);
    return res.status(200).json(updatedVehicle);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete vehicle by ID
const deleteVehicleById = async (req, res) => {
  const vehicleId = req.params.id;
  try {
    const deletedRows = await Vehicle.destroy({ where: { id: vehicleId } });
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination
const indexVehicles = async (req, res) => {
  try {
    const page = req.query.page || 1; // Default to page 1 if not specified
    const pageSize = 10; // Number of results per page

    const { count, rows } = await Vehicle.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);
    const currentPage = parseInt(page, 10);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return res.status(200).json({
      vehicles: rows,
      totalCount: count,
      currentPage,
      totalPages,
      startPage,
      endPage,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTenantForVehicleById = async (req, res) => {
  const { tenant_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Vehicle.findAndCountAll({
      where: { tenant_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ tenants: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination, associated with VehicleDetail
const getVehicleDetailsForVehicleWithPagination = async (req, res) => {
  const { vehicle_id } = req.params;
  try {
    const page = req.query.page || 1; // Default to page 1 if not specified
    const pageSize = 10; // Number of results per page

    const { count, rows } = await VehicleDetail.findAndCountAll({
      where: { vehicle_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);
    const currentPage = parseInt(page, 10);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return res.status(200).json({
      vehicles: rows,
      totalCount: count,
      currentPage,
      totalPages,
      startPage,
      endPage,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination, associated with VehicleApproval
const getVehicleApprovalsForVehicleWithPagination = async (req, res) => {
  const { vehicle_id } = req.params;
  try {
    const page = req.query.page || 1; // Default to page 1 if not specified
    const pageSize = 10; // Number of results per page

    const { count, rows } = await VehicleApproval.findAndCountAll({
      where: { vehicle_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);
    const currentPage = parseInt(page, 10);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return res.status(200).json({
      vehicles: rows,
      totalCount: count,
      currentPage,
      totalPages,
      startPage,
      endPage,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination, associated with VehicleImage
const getVehicleImagesForVehicleWithPagination = async (req, res) => {
  const { vehicle_id } = req.params;
  try {
    const page = req.query.page || 1; // Default to page 1 if not specified
    const pageSize = 10; // Number of results per page

    const { count, rows } = await VehicleImages.findAndCountAll({
      where: { vehicle_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);
    const currentPage = parseInt(page, 10);
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    return res.status(200).json({
      vehicles: rows,
      totalCount: count,
      currentPage,
      totalPages,
      startPage,
      endPage,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicleById,
  indexVehicles,
  getVehicleApprovalsForVehicleWithPagination,
  getVehicleImagesForVehicleWithPagination,
  getTenantForVehicleById,
  getVehicleDetailsForVehicleWithPagination,
};
