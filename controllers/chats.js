// controllers/chatController.js
const { Chat } = require('../models');

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

exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.findAll();
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChatById = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findByPk(id);
    if (chat) {
      res.json(chat);
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createChat = async (req, res) => {
  const { tenant_id, user_id, conversation, status } = req.body;
  try {
    const newChat = await Chat.create({
      tenant_id,
      user_id,
      conversation,
      status,
    });
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateChat = async (req, res) => {
  const { id } = req.params;
  const { tenant_id, user_id, conversation, status } = req.body;
  try {
    const chat = await Chat.findByPk(id);
    if (chat) {
      await chat.update({ tenant_id, user_id, conversation, status });
      res.json(chat);
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteChatById = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findByPk(id);
    if (chat) {
      await chat.destroy();
      res.json({ message: 'Chat deleted successfully' });
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Complete Index route with backend pagination of 10 results
exports.getChatsWithPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Chat.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ chats: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with a specific user
exports.getChatsForUserWithPagination = async (req, res) => {
  const { user_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Chat.findAndCountAll({
      where: { user_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ chats: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results, associated with a specific tenant
exports.getChatsForTenantWithPagination = async (req, res) => {
  const { tenant_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await Chat.findAndCountAll({
      where: { tenant_id },
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    res.json({ chats: rows, pagination: paginationData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
