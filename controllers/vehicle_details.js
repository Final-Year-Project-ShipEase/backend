const { VehicleDetail } = require('../models');

// Create a new vehicle detail
const createVehicleDetail = async (req, res) => {
  try {
    const vehicleDetail = await VehicleDetail.create(req.body);
    return res.status(201).json(vehicleDetail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all vehicle details
const getAllVehicleDetails = async (req, res) => {
  try {
    const vehicleDetails = await VehicleDetail.findAll();
    return res.status(200).json(vehicleDetails);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get vehicle detail by ID
const getVehicleDetailById = async (req, res) => {
  const vehicleDetailId = req.params.id;
  try {
    const vehicleDetail = await VehicleDetail.findByPk(vehicleDetailId);
    if (!vehicleDetail) {
      return res.status(404).json({ error: 'Vehicle detail not found' });
    }
    return res.status(200).json(vehicleDetail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update vehicle detail by ID
const updateVehicleDetail = async (req, res) => {
  const vehicleDetailId = req.params.id;
  try {
    const [updatedRows] = await VehicleDetail.update(req.body, {
      where: { id: vehicleDetailId },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Vehicle detail not found' });
    }
    const updatedVehicleDetail = await VehicleDetail.findByPk(vehicleDetailId);
    return res.status(200).json(updatedVehicleDetail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete vehicle detail by ID
const deleteVehicleDetailById = async (req, res) => {
  const vehicleDetailId = req.params.id;
  try {
    const deletedRows = await VehicleDetail.destroy({
      where: { id: vehicleDetailId },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Vehicle detail not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVehicleDetail,
  getAllVehicleDetails,
  getVehicleDetailById,
  updateVehicleDetail,
  deleteVehicleDetailById,
};
