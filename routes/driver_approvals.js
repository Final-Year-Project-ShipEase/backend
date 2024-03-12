// routes/driverApprovalRoutes.js
const express = require('express');
const router = express.Router();
const driverApprovalController = require('../controllers/driver_approvals');

module.exports = (app) => {
  router.get(
    '/driverApprovals',
    driverApprovalController.getAllDriverApprovals
  );
  router.get(
    '/driverApproval/:driver_id',
    driverApprovalController.getDriverApprovalById
  );
  router.post('/driverApproval', driverApprovalController.createDriverApproval);
  router.put(
    '/driverApproval/:driver_id',
    driverApprovalController.updateDriverApproval
  );
  router.delete(
    '/driverApproval/:driver_id',
    driverApprovalController.deleteDriverApprovalById
  );

  // Index route with backend pagination of 10 results, associated with Tenant
  router.get(
    '/tenants/:tenant_id/driverApprovals/index',
    driverApprovalController.getDriverApprovalsForTenantWithPagination
  );

  // Index route with backend pagination of 10 results, associated with Driver
  router.get(
    '/drivers/:driver_id/driverApprovals/index',
    driverApprovalController.getDriverApprovalsForDriverWithPagination
  );

  // Index route with backend pagination of 10 results, associated with Admin
  router.get(
    '/admins/:admin_id/driverApprovals/index',
    driverApprovalController.getDriverApprovalsForAdminWithPagination
  );

  router.get(
    '/driverApproval/approve/:id',
    driverApprovalController.approveDriver
  );

  router.get(
    '/driverApproval/reject/:id',
    driverApprovalController.rejectDriver
  );

  router.get(
    '/driverApprovals/rejected',
    driverApprovalController.getRejectedDriverApprovals
  );
};
