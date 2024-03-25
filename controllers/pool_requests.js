// controllers/poolRequestController.js
const { PoolRequest } = require('../models');

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

exports.getAllPoolRequests = async (req, res) => {
  try {
    const poolRequests = await PoolRequest.findAll();
    res.json(poolRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPoolRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const poolRequest = await PoolRequest.findByPk(id);
    if (poolRequest) {
      res.json(poolRequest);
    } else {
      res.status(404).json({ error: 'PoolRequest not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPoolRequest = async (req, res) => {
  const { booking_id, types, city, destination, startDate, endDate } = req.body;
  // const { role } = req.user;

  // if (role != 'tenant') {
  //   return handleErrorResponse(res, 401, 'Token is not valid for Tenant');
  // }
  try {
    const newPoolRequest = await PoolRequest.create({
      booking_id,
      types,
      city,
      destination,
      startDate,
      endDate,
    });

    res.status(201).json(newPoolRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePoolRequest = async (req, res) => {
  const { id } = req.params;
  const { booking_id, types, city, destination, startDate, endDate } = req.body;
  const { role } = req.user;

  if (role != 'tenant') {
    return handleErrorResponse(res, 401, 'Token is not valid for Tenant');
  }
  try {
    const poolRequest = await PoolRequest.findByPk(id);
    if (poolRequest) {
      await poolRequest.update({
        booking_id,
        types,
        city,
        destination,
        startDate,
        endDate,
      });
      res.json(poolRequest);
    } else {
      res.status(404).json({ error: 'PoolRequest not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePoolRequestById = async (req, res) => {
  const { id } = req.params;
  // const { role } = req.user;

  // if (role != 'tenant') {
  //   return handleErrorResponse(res, 401, 'Token is not valid for Tenant');
  // }
  try {
    const poolRequest = await PoolRequest.findByPk(id);
    if (poolRequest) {
      await poolRequest.destroy();
      res.json({ message: 'PoolRequest deleted successfully' });
    } else {
      res.status(404).json({ error: 'PoolRequest not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete Index route with backend pagination of 10 results
exports.getPoolRequestsWithPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await PoolRequest.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ poolRequests: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
