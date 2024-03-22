const jwt = require("jsonwebtoken");
const { env } = require('../utils/constants.js');
const { handleErrorResponse } = require("../utils/helper.js");
const { JWT_SECRET_KEY } = env;

module.exports = (req, res, next) => {
  try {
    const tokenString = req.header("authorization");
    if (!tokenString) {
      return handleErrorResponse(res, 401, "UnAuthorized Access");
    }

    const token = tokenString.split(" ")[1];
    if (!token) return handleErrorResponse(res, 401, "UnAuthorized Access");

    const { id, email, role } = jwt.verify(token, JWT_SECRET_KEY);
    if (!id || !email || !role) return handleErrorResponse(res, 401, "Invalid Token");

    req.user = { id, email, role };
    next();
  } catch (error) {
    handleErrorResponse(res);
  }
};
