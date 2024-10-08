const jwt = require("jsonwebtoken");
const env = require("dotenv");
const User = require("../models/UserModel");
env.config();
const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, async function (err, user) {
    if (err) {
      return res.status(404).json({
        message: err,
        status: "ERROR",
      });
    }
    const data = await User.findById(user.id);
    if (data.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: err,
        status: "ERROR",
      });
    }
  });
};
const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, async function (err, user) {
    if (err) {
      return res.status(404).json({
        message: err,
        status: "ERROR",
      });
    }
    const data = await User.findById(user.id);
    if (data?.isAdmin || data?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: err,
        status: "ERROR",
      });
    }
  });
};
module.exports = { authMiddleware, authUserMiddleware };
