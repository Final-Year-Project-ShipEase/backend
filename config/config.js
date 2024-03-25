require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    // heroku config vars for production
    connectionString: process.env.DATABASE_URL,
    dialect: 'postgres',
    protocol: 'postgres',
    database: process.env.DB_NAME,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
