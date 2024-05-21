const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');


const { print, validateRequiredEnvVars } = require('./utils/helper');
const DBConnection = require('./config/db');


const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const basePath = `${process.cwd()}/routes/`;
fs.readdirSync(basePath).forEach((route) => {
  require(basePath + route)(app);
});

validateRequiredEnvVars(process.env);

(async function () {
  try {
    await DBConnection.authenticate();
    print('Database Connection has been established successfully');
  } catch (error) {
    print('Unable to connect to the database', error);
  }
})();

const port = process.env.PORT || 3000;

app.listen(port, () => print(`Server is Running at Port: ${port}`));
