const Joi = require('joi');

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const validateToken = Joi.object({
  token: Joi.string().required(),
});

const updatePassword = Joi.object({
  password: Joi.string().required(),
});

module.exports = {
  login,
  validateToken,
  updatePassword,
};
