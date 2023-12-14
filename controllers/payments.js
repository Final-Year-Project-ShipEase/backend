// controllers/paymentController.js
const { Payment } = require('../models');

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByPk(id);
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPayment = async (req, res) => {
  const {
    tenant_id,
    booking_id,
    date,
    total,
    received,
    remaining,
    source,
    account_no,
  } = req.body;
  try {
    const newPayment = await Payment.create({
      tenant_id,
      booking_id,
      date,
      total,
      received,
      remaining,
      source,
      account_no,
    });
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const {
    tenant_id,
    booking_id,
    date,
    total,
    received,
    remaining,
    source,
    account_no,
  } = req.body;
  try {
    const payment = await Payment.findByPk(id);
    if (payment) {
      await payment.update({
        tenant_id,
        booking_id,
        date,
        total,
        received,
        remaining,
        source,
        account_no,
      });
      res.json(payment);
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByPk(id);
    if (payment) {
      await payment.destroy();
      res.json({ message: 'Payment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
