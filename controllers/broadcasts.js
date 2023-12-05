// controllers/broadcastController.js
const { Broadcast, Tenant } = require('../models');

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

exports.getAllBroadcasts = async (req, res) => {
  try {
    const broadcasts = await Broadcast.findAll();
    res.json(broadcasts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBroadcastById = async (req, res) => {
  const { id } = req.params;
  try {
    const broadcast = await Broadcast.findByPk(id);
    if (broadcast) {
      res.json(broadcast);
    } else {
      res.status(404).json({ error: 'Broadcast not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBroadcast = async (req, res) => {
  const { tenant_id, content, date, phoneNo, status } = req.body;
  try {
    const newBroadcast = await Broadcast.create({
      tenant_id,
      content,
      date,
      phoneNo,
      status,
    });
    res.status(201).json(newBroadcast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBroadcast = async (req, res) => {
  const { id } = req.params;
  const { tenant_id, content, date, phoneNo, status } = req.body;
  try {
    const broadcast = await Broadcast.findByPk(id);
    if (broadcast) {
      await broadcast.update({ tenant_id, content, date, phoneNo, status });
      res.json(broadcast);
    } else {
      res.status(404).json({ error: 'Broadcast not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBroadcastById = async (req, res) => {
  const { id } = req.params;
  try {
    const broadcast = await Broadcast.findByPk(id);
    if (broadcast) {
      await broadcast.destroy();
      res.json({ message: 'Broadcast deleted successfully' });
    } else {
      res.status(404).json({ error: 'Broadcast not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete Index route with backend pagination of 10 results
exports.getBroadcastsWithPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Broadcast.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ broadcasts: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with a specific tenant
exports.getBroadcastsForTenantWithPagination = async (req, res) => {
  const { tenant_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Broadcast.findAndCountAll({
      where: { tenant_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ broadcasts: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
