// controllers/reviewController.js
const { Review } = require('../models'); 

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createReview = async (req, res) => {
  const { driver_id, star, review, date } = req.body;
  try {
    const newReview = await Review.create({
      driver_id,
      star,
      review,
      date,
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { driver_id, star, review, date } = req.body;
  try {
    const reviewInstance = await Review.findByPk(id);
    await reviewInstance.update({
      driver_id,
      star,
      review,
      date,
    });

    res.json(reviewInstance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    await review.destroy();

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReviewById,
};
