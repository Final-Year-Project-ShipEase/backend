exports.createAccessToken = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({
    where: {
      username,
    },
  });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return handleErrorResponse(res, 401, "Invalid Credentials");
  }

  const token = jwt.sign(getDataToSend(admin), env.JWT_SECRET_KEY, {
    expiresIn: env.TOKEN_EXPIRATION
  });

  admin.token = token;
  await admin.save();
  res.json({ 
    success: true,
    message: 'Admin logged in successfully',
    data: {...getDataToSend(admin), token}
   });
};