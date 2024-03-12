const express = require('express');
const router = express.Router();
const authAdminController = require('../controllers/authAdmin');
const RequestValidator = require('../middleware/requestValidator');
const Schema = require('../joiSchemas/auth');
const TokenValidator = require('../middleware/tokenValidator');

module.exports = (app) => {
  router.get('/refresh', authAdminController.refreshAccessToken);
  router.post(
    '/login',
    RequestValidator(Schema.login),
    authAdminController.login
  );
  router.get(
    '/verify',
    RequestValidator(Schema.validateToken),
    authAdminController.verifyAccessToken
  );
  router.post(
    '/updatepassword',
    RequestValidator(Schema.updatePassword),
    TokenValidator,
    authAdminController.updatePassword
  );
  app.use('/admin/auth', router);
};