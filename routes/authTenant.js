const express = require('express');
const router = express.Router();
const authTenantController = require('../controllers/authTenant');
const RequestValidator = require('../middleware/requestValidator');
const Schema = require('../joiSchemas/auth');
const TokenValidator = require('../middleware/tokenValidator');

module.exports = (app) => {
  router.post(
    '/login',
    RequestValidator(Schema.login),
    authTenantController.login
  );
  router.get('/refresh', authTenantController.refreshAccessToken);
  router.get(
    '/verify',
    RequestValidator(Schema.validateToken),
    authTenantController.verifyAccessToken
  );
  router.post(
    '/updatepassword',
    RequestValidator(Schema.updatePassword),
    TokenValidator,
    authTenantController.updatePassword
  );
  app.use('/tenant/auth/', router);
};
