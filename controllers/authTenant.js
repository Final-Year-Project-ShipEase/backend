const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const accessExpiresIn = '2m';
const refreshExpiresIn = '1d';
const { Tenant } = require('../models');
const { env } = require('../utils/constants');
const { api, handleErrorResponse } = require('../utils/helper');

const getDataToSend = (tenant) => ({
  id: tenant.id,
  email: tenant.email,
  role: 'tenant',
});

const createTokens = async (tenant) => {
  const accessToken = jwt.sign(
    { id: tenant.id, username: tenant.username },
    secretKey,
    { expiresIn: accessExpiresIn }
  );

  const refreshToken = jwt.sign(
    { id: tenant.id, username: tenant.username },
    secretKey,
    { expiresIn: refreshExpiresIn }
  );

  return { accessToken, refreshToken };
};

exports.refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decodedToken = jwt.verify(refreshToken, secretKey);
    const { accessToken, refreshToken: newRefreshToken } = await createTokens({
      id: decodedToken.id,
      username: decodedToken.username,
    });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const tenant = await Tenant.findOne({
    where: {
      username,
    },
  });

  if (!tenant || !(await bcrypt.compare(password, tenant.password))) {
    return handleErrorResponse(res, 401, 'Invalid Credentials');
  }

  const token = jwt.sign(getDataToSend(tenant), env.JWT_SECRET_KEY, {
    expiresIn: env.TOKEN_EXPIRATION,
  });

  tenant.token = token;
  await tenant.save();
  res.json({
    success: true,
    message: 'tenant logged in successfully',
    data: { ...getDataToSend(tenant), token },
  });
};

exports.verifyAccessToken = async (req, res, next) => {
  api(res, async () => {
    const { token } = req.body;
    const tenant = await Tenant.findOne({ where: { token } });
    if (!tenant) return handleErrorResponse(res, 401, 'Invalid Token');

    res.json({
      success: true,
      message: 'Valid Token',
      data: { ...getDataToSend(tenant), token: tenant.token },
    });
  });
};

exports.updatePassword = async (req, res) => {
  const { id, email } = req.user;
  const { password } = req.body;
  try {
    const tenant = await Tenant.findByPk(id);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    tenant.password = hashedPassword;
    await tenant.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
