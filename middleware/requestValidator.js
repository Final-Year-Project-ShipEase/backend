const { handleErrorResponse } = require("../utils/helper.js");

module.exports = (reqSchema, key = "body") => {
  return async (req, res, next) => {
    try {
      const obj = await reqSchema.validateAsync(req[key], {
        abortEarly: true
      });
      req[key] = obj;
      next();
    } catch (error) {
      handleErrorResponse(res, 400, error.message);
    }
  };
};
