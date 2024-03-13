// controllers/driverApprovalController.js
const { DriverApproval } = require('../models');

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

exports.getAllDriverApprovals = async (req, res) => {
  try {
    const driverApprovals = await DriverApproval.findAll();
    res.json(driverApprovals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDriverApprovalById = async (req, res) => {
  const { driver_id } = req.params;
  try {
    const driverApproval = await DriverApproval.findByPk(driver_id);
    if (driverApproval) {
      res.json(driverApproval);
    } else {
      res.status(404).json({ error: 'DriverApproval not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDriverApproval = async (req, res) => {
  const { driver_id, tenant_id, admin_id, permission, status } = req.body;
  const { role } = req.user;

  if (role != 'tenant') {
    return handleErrorResponse(res, 401, 'Token is not valid for Tenant');
  }
  try {
    const newDriverApproval = await DriverApproval.create({
      driver_id,
      tenant_id,
      admin_id,
      permission,
      status,
    });

    res.status(201).json(newDriverApproval);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDriverApproval = async (req, res) => {
  const { driver_id } = req.params;
  const { tenant_id, admin_id, permission, status } = req.body;
  const { role } = req.user;

  if (role != 'tenant') {
    return handleErrorResponse(res, 401, 'Token is not valid for Tenant');
  }
  try {
    const driverApproval = await DriverApproval.findByPk(driver_id);
    if (driverApproval) {
      await driverApproval.update({ tenant_id, admin_id, permission, status });
      res.json(driverApproval);
    } else {
      res.status(404).json({ error: 'DriverApproval not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDriverApprovalById = async (req, res) => {
  const { driver_id } = req.params;
  const { role } = req.user;

  if (role != 'tenant') {
    return handleErrorResponse(res, 401, 'Token is not valid for Tenant');
  }
  try {
    const driverApproval = await DriverApproval.findByPk(driver_id);
    if (driverApproval) {
      await driverApproval.destroy();
      res.json({ message: 'DriverApproval deleted successfully' });
    } else {
      res.status(404).json({ error: 'DriverApproval not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete Index route with backend pagination of 10 results
exports.getDriverApprovalsForTenantWithPagination = async (req, res) => {
  const { tenant_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await DriverApproval.findAndCountAll({
      where: { tenant_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ driverApprovals: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with Driver
exports.getDriverApprovalsForDriverWithPagination = async (req, res) => {
  const { driver_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await DriverApproval.findAndCountAll({
      where: { driver_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ driverApprovals: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with Admin
exports.getDriverApprovalsForAdminWithPagination = async (req, res) => {
  const { admin_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await DriverApproval.findAndCountAll({
      where: { admin_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ driverApprovals: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveDriver = async (req, res) => {
  const { id } = req.params;
  try {
    const driverApproval = await DriverApproval.findByPk(id);
    if (driverApproval) {
      await driverApproval.update({ permission: 'approved' });
      res.json(driverApproval);
    } else {
      res.status(404).json({ error: 'DriverApproval not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rejectDriver = async (req, res) => {
  const { id } = req.params;
  try {
    const driverApproval = await DriverApproval.findByPk(id);
    if (driverApproval) {
      await driverApproval.update({ permission: 'rejected' });
      res.json(driverApproval);
    } else {
      res.status(404).json({ error: 'DriverApproval not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRejectedDriverApprovals = async (req, res) => {
  try {
    const rejectedApprovals = await DriverApproval.findAll({
      where: { permission: 'rejected' },
    });
    return res.status(200).json(rejectedApprovals);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
