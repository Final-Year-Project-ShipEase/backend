const jwt = require('jsonwebtoken');

const secretKey = 'SHIPEASE'; 
const expiresIn = '1h'; 
const {Admin} = require('../models');

exports.createAccessToken = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ where: { username, password } });
  if (admin) {
    const accessToken = jwt.sign(
      { id: this.id, username: this.username },
      secretKey,
      { expiresIn }
    );
    res.json({ accessToken });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

exports.getAccessToken = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, secretKey);
    res.json({ decodedToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
