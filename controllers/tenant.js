// controllers/tenantController.js
const { Tenant } = require('../models');

const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTenantById = async (req, res) => {
  const { id } = req.params;
  try {
    const tenant = await Tenant.findByPk(id);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTenant = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    phoneNo,
    cities,
    permissions,
    status,
  } = req.body;
  try {
    const newTenant = await Tenant.create({
      username,
      name,
      email,
      password,
      phoneNo,
      cities,
      permissions,
      status,
    });
    res.status(201).json(newTenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTenant = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    name,
    email,
    password,
    phoneNo,
    cities,
    permissions,
    status,
  } = req.body;
  try {
    const tenant = await Tenant.findByPk(id);

    await tenant.update({
      username,
      name,
      email,
      password,
      phoneNo,
      cities,
      permissions,
      status,
    });

    res.json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteTenantById = async (req, res) => {
  const { id } = req.params;
  try {
    const tenant = await Tenant.findByPk(id);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    await tenant.destroy();

    res.json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getUserData = async (req, res) => {
  const { username, password } = req.body;
  try {
    const tenant = await Tenant.findOne({
      where: {
        username,
        password,
      },
    });
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenantById,
  getUserData,
};
