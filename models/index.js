const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

const AdminModel = require('./admin.model');
const ChatModel = require('./chats.model');
const TenantModel = require('./tenants.model');
const UserModel = require('./users.model');
const VehicleModel = require('./vehicle.model');
const BookingModel = require('./bookings.model');
const PoolRequestModel = require('./pool_requests.model');
const ShipmentVerificationModel = require('./shipment_verifications.model');
const PaymentModel = require('./payments.model');
const ReviewModel = require('./reviews.model');
const BroadcastModel = require('./broadcasts.model');
const ComplaintModel = require('./complaints.model');
const DriverModel = require('./drivers.model');
const PromotionModel = require('./promotions.model');
const DriverApprovalModel = require('./driver_approval.model');
const DriverDetailsModel = require('./driver_details.model');
const DriverLicenseImageModel = require('./driver_license_images.model');
const VehicleApprovalModel = require('./vehicle_approval.model');
const VehicleImageModel = require('./vehicle_images.model');

const Admin = AdminModel(sequelize, DataTypes);
const Chat = ChatModel(sequelize, DataTypes);
const Tenant = TenantModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Vehicle = VehicleModel(sequelize, DataTypes);
const Booking = BookingModel(sequelize, DataTypes);
const PoolRequest = PoolRequestModel(sequelize, DataTypes);
const ShipmentVerification = ShipmentVerificationModel(sequelize, DataTypes);
const Payment = PaymentModel(sequelize, DataTypes);
const Review = ReviewModel(sequelize, DataTypes);
const Broadcast = BroadcastModel(sequelize, DataTypes);
const Complaint = ComplaintModel(sequelize, DataTypes);
const Driver = DriverModel(sequelize, DataTypes);
const Promotion = PromotionModel(sequelize, DataTypes);
const DriverApproval = DriverApprovalModel(sequelize, DataTypes);
const DriverDetail = DriverDetailsModel(sequelize, DataTypes);
const DriverLicenseImages = DriverLicenseImageModel(sequelize, DataTypes);
const VehicleApproval = VehicleApprovalModel(sequelize, DataTypes);
const VehicleImages = VehicleImageModel(sequelize, DataTypes);

module.exports = {
  sequelize,
  Admin,
  Chat,
  Tenant,
  User,
  Vehicle,
  Booking,
  PoolRequest,
  ShipmentVerification,
  Payment,
  Review,
  Broadcast,
  Complaint,
  Driver,
  Promotion,
  DriverApproval,
  DriverDetail,
  DriverLicenseImages,
  VehicleApproval,
  VehicleImages,
};
