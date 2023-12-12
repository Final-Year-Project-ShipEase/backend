const { VehicleApproval } = require('../models');

// Create a new vehicle approval
const createVehicleApproval = async (req, res) => {
  try {
    const vehicleApproval = await VehicleApproval.create(req.body);
    return res.status(201).json(vehicleApproval);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all vehicle approvals
const getAllVehicleApprovals = async (req, res) => {
  try {
    const vehicleApprovals = await VehicleApproval.findAll();
    return res.status(200).json(vehicleApprovals);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get vehicle approval by ID
const getVehicleApprovalById = async (req, res) => {
  const vehicleApprovalId = req.params.id;
  try {
    const vehicleApproval = await VehicleApproval.findByPk(vehicleApprovalId);
    if (!vehicleApproval) {
      return res.status(404).json({ error: 'Vehicle approval not found' });
    }
    return res.status(200).json(vehicleApproval);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update vehicle approval by ID
const updateVehicleApproval = async (req, res) => {
  const vehicleApprovalId = req.params.id;
  try {
    const [updatedRows] = await VehicleApproval.update(req.body, {
      where: { id: vehicleApprovalId },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Vehicle approval not found' });
    }
    const updatedVehicleApproval = await VehicleApproval.findByPk(
      vehicleApprovalId
    );
    return res.status(200).json(updatedVehicleApproval);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete vehicle approval by ID
const deleteVehicleApprovalById = async (req, res) => {
  const vehicleApprovalId = req.params.id;
  try {
    const deletedRows = await VehicleApproval.destroy({
      where: { id: vehicleApprovalId },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Vehicle approval not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get rejected vehicle approvals
const getRejectedVehicleApprovals = async (req, res) => {
  try {
    const rejectedApprovals = await VehicleApproval.findAll({
      where: { permission: 'rejected' },
    });
    return res.status(200).json(rejectedApprovals);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVehicleApproval,
  getAllVehicleApprovals,
  getVehicleApprovalById,
  updateVehicleApproval,
  deleteVehicleApprovalById,
  getRejectedVehicleApprovals,
};
