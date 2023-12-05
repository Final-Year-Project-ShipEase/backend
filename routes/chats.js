// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/chats', chatController.getAllChats);
router.get('/chat/:id', chatController.getChatById);
router.post('/chat', chatController.createChat);
router.put('/chat/:id', chatController.updateChat);
router.delete('/chat/:id', chatController.deleteChatById);

// Index route with backend pagination of 10 results
router.get('/chats/index', chatController.getChatsWithPagination);

// Index route with backend pagination of 10 results, associated with a specific user
router.get(
  '/users/:user_id/chats/index',
  chatController.getChatsForUserWithPagination
);

// Index route with backend pagination of 10 results, associated with a specific tenant
router.get(
  '/tenants/:tenant_id/chats/index',
  chatController.getChatsForTenantWithPagination
);

module.exports = router;
