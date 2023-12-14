// routes/promotionRoutes.js
const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotion');

router.get('/promotions', promotionController.getAllPromotions);
router.get('/promotion/:id', promotionController.getPromotionById);
router.post('/promotion', promotionController.createPromotion);
router.put('/promotion/:id', promotionController.updatePromotion);
router.delete('/promotion/:id', promotionController.deletePromotionById);

module.exports = router;
