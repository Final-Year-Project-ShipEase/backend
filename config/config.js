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
    use_env_variable:
      'postgres://aytubncgvakpug:a2ad2ad7cc2c0987fd91ea6425df212f5517302d2cac229411897c02bcf5efc0@ec2-107-21-67-46.compute-1.amazonaws.com:5432/df6mttapos0aml',
    dialect: process.env.DB_DIALECT,
    protocol: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

