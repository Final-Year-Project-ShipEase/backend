// controllers/shipmentVerificationController.js
const { ShipmentVerification } = require('../models');

const getAllShipments = async (req, res) => {
  try {
    const shipments = await ShipmentVerification.findAll();
    res.json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getShipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await ShipmentVerification.findByPk(id);
    if (!shipment) {
      return res.status(404).json({ error: 'Shipment Verification not found' });
    }
    res.json(shipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createShipment = async (req, res) => {
  const { booking_id, driver_id, type, data } = req.body;
  try {
    const newShipment = await ShipmentVerification.create({
      booking_id,
      driver_id,
      type,
      data,
    });
    res.status(201).json(newShipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateShipment = async (req, res) => {
  const { id } = req.params;
  const { booking_id, driver_id, type, data } = req.body;
  try {
    const shipmentInstance = await ShipmentVerification.findByPk(id);
    if (!shipmentInstance) {
      return res.status(404).json({ error: 'Shipment Verification not found' });
    }

    await shipmentInstance.update({
      booking_id,
      driver_id,
      type,
      data,
    });

    res.json(shipmentInstance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteShipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await ShipmentVerification.findByPk(id);
    if (!shipment) {
      return res.status(404).json({ error: 'Shipment Verification not found' });
    }

    await shipment.destroy();

    res.json({ message: 'Shipment Verification deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  deleteShipmentById,
};
