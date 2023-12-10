// controllers/complaintController.js
const { Complaint } = require('../models');

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findAll();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComplaintById = async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findByPk(id);
    if (complaint) {
      res.json(complaint);
    } else {
      res.status(404).json({ error: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComplaint = async (req, res) => {
  const { admin_id, status } = req.body;
  try {
    const newComplaint = await Complaint.create({ admin_id, status });
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComplaint = async (req, res) => {
  const { id } = req.params;
  const { admin_id, status } = req.body;
  try {
    const complaint = await Complaint.findByPk(id);
    if (complaint) {
      await complaint.update({ admin_id, status });
      res.json(complaint);
    } else {
      res.status(404).json({ error: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComplaintById = async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findByPk(id);
    if (complaint) {
      await complaint.destroy();
      res.json({ message: 'Complaint deleted successfully' });
    } else {
      res.status(404).json({ error: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
