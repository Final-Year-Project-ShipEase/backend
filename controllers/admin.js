// controllers/adminController.js
const { Admin } = require('../models');

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByPk(id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  const { name, email, password, username, data } = req.body;
  try {
    const newAdmin = await Admin.create({
      name,
      email,
      password,
      username,
      data
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, username, data } = req.body;
  try {
    const admin = await Admin.findByPk(id);
    if (admin) {
      await admin.update({ name, email, password, username, data });
      res.json(admin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByPk(id);
    if (admin) {
      await admin.destroy();
      res.json({ message: 'Admin deleted successfully' });
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
