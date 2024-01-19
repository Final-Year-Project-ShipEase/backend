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
    tenant.refreshToken = refreshToken;
    await tenant.save();
    tenant.token = accessToken;
    res.json({ tenant });
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

exports.verifyAccessToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, secretKey);
      req.tenant = decodedToken;
      res.status(200).json({ success: 'Valid access token' });
    } catch (error) {
      res.status(401).json({ error: 'Invalid or expired access token' });
    }
  } else {
    res.status(401).json({ error: 'No access token provided' });
  }
};
