const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'SHIPEASE';
const { Admin } = require('../models');
const { env } = require("../utils/constants");
const { api, handleErrorResponse } = require('../utils/helper');

const getDataToSend = (admin) => ({
  id: admin.id,
  email: admin.email,
  role: 'admin',
});

// TODO: Create Tokens
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

// TODO: Refresh Token
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


exports.login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({
    where: {
      username,
    },
  });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return handleErrorResponse(res, 401, 'Invalid Credentials');
  }

  const token = jwt.sign(getDataToSend(admin), env.JWT_SECRET_KEY, {
    expiresIn: env.TOKEN_EXPIRATION,
  });

  admin.token = token;
  await admin.save();
  res.json({
    success: true,
    message: 'Admin logged in successfully',
    data: { ...getDataToSend(admin), token },
  });
};

exports.verifyAccessToken = async (req, res, next) => {
  api(res, async () => {
    const { token } = req.body;
    const admin = await Admin.findOne({ where: { token } });
    if (!admin) return handleErrorResponse(res, 401, "Invalid Token");

    res.json({
      success: true,
      message: "Valid Token",
      data: { ...getDataToSend(admin), token: admin.token }
    });
  });
};

exports.updatePassword = async (req, res) => {
  api(res, async () => {
    const { id, email } = req.user;
    const { password } = req.body;
    const admin = await Admin.findOne({ where: { id, email } });
    if (!admin) return handleErrorResponse(res, 404, "User Not Found");

    const hashedPassword = await bcrypt.hash(password, 10);
    admin.password = hashedPassword;
    await admin.save();
    res.json({ success: true, message: "Password has been Updated" });
  });
}
