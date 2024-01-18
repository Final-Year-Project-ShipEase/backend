const jwt = require('jsonwebtoken');

const secretKey = 'SHIPEASE';
const accessExpiresIn = '2m';
const refreshExpiresIn = '30d'; // Longer expiration time for refresh token
const { Tenant } = require('../models');

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

exports.createAccessToken = async (req, res) => {
  const { username, password } = req.body;
  const tenant = await Tenant.findOne({
    where: {
      username,
      password,
    },
  });

  if (tenant) {
    const { accessToken, refreshToken } = await createTokens(tenant);
    res.json({ accessToken, refreshToken });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

exports.refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decodedToken = jwt.verify(refreshToken, secretKey);
    console.log(decodedToken);
    const { accessToken, refreshToken: newRefreshToken } = await createTokens({
      id: decodedToken.id,
      username: decodedToken.username,
    });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
};
