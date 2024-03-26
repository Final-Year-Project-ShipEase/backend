// controllers/userController.js
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/nodemailer');
const e = require('express');

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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { username, name, email, password, phoneNo, city } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const usernameExists = await User.findOne({ where: { username } });
    if (usernameExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP

    const newUser = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
      phoneNo,
      city,
    });

    // Attempt to send an email to the user
    try {
      await sendEmail({ email: newUser.email }, otp); // Assuming sendEmail is properly defined to handle this
      // Consider storing the OTP in your database associated with the user for verification later
    } catch (emailError) {
      console.error(emailError);
      // Optionally, handle email send failure (log it, retry, etc.)
    }

    // Respond with the newly created user
    // Exclude sensitive information from the response, e.g., hashed password
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      phoneNo: newUser.phoneNo,
      city: newUser.city,
    };
    return res.status(201).json(userResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, name, email, password, phoneNo, city } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update({ username, name, email, password, phoneNo, city });
      return res.json(user);
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return res.json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Index route with backend pagination of 10 results
exports.getUsersWithPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  try {
    const { count, rows } = await User.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const paginationData = calculatePagination(count, pageSize, page);

    return res.json({ users: rows, pagination: paginationData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        status: 200,
        message: 'User logged in successfully',
        user,
      });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
