const { VehicleImages } = require('../models');

// Create new vehicle images
const createVehicleImage = async (req, res) => {
  try {
    const vehicleImages = await VehicleImages.create(req.body);
    return res.status(201).json(vehicleImages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all vehicle images
const getAllVehicleImages = async (req, res) => {
  try {
    const vehicleImages = await VehicleImages.findAll();
    return res.status(200).json(vehicleImages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get vehicle images by ID
const getVehicleImageById = async (req, res) => {
  const vehicleImagesId = req.params.id;
  try {
    const vehicleImages = await VehicleImages.findByPk(vehicleImagesId);
    if (!vehicleImages) {
      return res.status(404).json({ error: 'Vehicle images not found' });
    }
    return res.status(200).json(vehicleImages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update vehicle images by ID
const updateVehicleImage = async (req, res) => {
  const vehicleImagesId = req.params.id;
  try {
    const [updatedRows] = await VehicleImages.update(req.body, {
      where: { id: vehicleImagesId },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Vehicle images not found' });
    }
    const updatedVehicleImages = await VehicleImages.findByPk(vehicleImagesId);
    return res.status(200).json(updatedVehicleImages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete vehicle images by ID
const deleteVehicleImageById = async (req, res) => {
  const vehicleImagesId = req.params.id;
  try {
    const deletedRows = await VehicleImages.destroy({
      where: { id: vehicleImagesId },
    });
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Vehicle images not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVehicleImage,
  getAllVehicleImages,
  getVehicleImageById,
  updateVehicleImage,
  deleteVehicleImageById,
};
