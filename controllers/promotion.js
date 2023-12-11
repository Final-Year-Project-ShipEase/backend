// controllers/promotionController.js
const { Promotion } = require('../models');

const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll();
    res.json(promotions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getPromotionById = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }
    res.json(promotion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createPromotion = async (req, res) => {
  const { tenant_id, couponNo, validationTill, status, phoneNo, city } = req.body;
  try {
    const newPromotion = await Promotion.create({
      tenant_id,
      couponNo,
      validationTill,
      status,
      phoneNo,
      city,
    });
    res.status(201).json(newPromotion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { tenant_id, couponNo, validationTill, status, phoneNo, city } = req.body;
  try {
    const promotionInstance = await Promotion.findByPk(id);
    if (!promotionInstance) {
      return res.status(404).json({ error: 'Promotion not found' });
    }

    await promotionInstance.update({
      tenant_id,
      couponNo,
      validationTill,
      status,
      phoneNo,
      city,
    });

    res.json(promotionInstance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deletePromotionById = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }

    await promotion.destroy();

    res.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotionById,
};
