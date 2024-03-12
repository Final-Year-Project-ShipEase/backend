const moment = require("moment-timezone");

const requiredEnvVariables = [
  "NODE_ENV",
  "DB_HOST",
  "DB_PORT",
  "DB_USERNAME",
  "DB_PASSWORD",
  "DB_DATABASE",
  "DB_DIALECT=",
  "BACKEND_PORT",
  "REACT_FRONT_END_URL",
  "JWT_SECRET_KEY",
  "TOKEN_EXPIRATION"
];

const common = {
  // eslint-disable-next-line no-console
  print: (...msg) => console.log(moment().format(), ...msg),
  validateRequiredEnvVars: (envVariables) => {
    const missingEnvVariables = requiredEnvVariables.filter(
      (envVar) => !envVariables[envVar]
    );
    if (missingEnvVariables.length > 0) {
      common.print(
        ` Missing environment variables: ${missingEnvVariables.join(", ")}`
      );
      throw new Error("Unsupported environment.");
    }
  },
  handleErrorResponse: (res, status = 500, message = "Something went wrong") =>
    res.status(status).json({ success: false, message }),
  api: async (res, action) => {
    try {
      await action();
    } catch (error) {
      common.print(error);
      common.handleErrorResponse(res);
    }
  }
};

module.exports = common;
