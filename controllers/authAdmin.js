const jwt = require('jsonwebtoken');

const secretKey = 'SHIPEASE';
const accessExpiresIn = '2m';
const refreshExpiresIn = '30d';
const { Admin } = require('../models');

const createTokens = async (admin) => {
  const accessToken = jwt.sign(
    { id: admin.id, username: admin.username },
    secretKey,
    { expiresIn: accessExpiresIn }
  );

  const refreshToken = jwt.sign(
    { id: admin.id, username: admin.username },
    secretKey,
    { expiresIn: refreshExpiresIn }
  );

  return { accessToken, refreshToken };
};

exports.createAccessToken = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({
    where: {
      username,
      password,
    },
  });

  if (admin) {
    const { accessToken, refreshToken } = await createTokens(admin);
    admin.refreshToken = refreshToken;
    await admin.save();
    admin.token = accessToken;
    res.json({ tenant: admin });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

exports.refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decodedToken = jwt.verify(refreshToken, secretKey);
    const { accessToken, refreshToken } = await createTokens({
      id: decodedToken.id,
      username: decodedToken.username,
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
};

exports.verifyAccessToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    try {
      console.log(decodedToken);
      const decodedToken = jwt.verify(token, secretKey);
      req.admin = decodedToken;
      res.status(200).json({ success: 'Valid access token' });
    } catch (error) {
      res.status(401).json({ error: 'Invalid or expired access token' });
    }
  } else {
    res.status(401).json({ error: 'No access token provided' });
  }
};
