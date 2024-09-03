const jwt = require("jsonwebtoken");
const env = require("dotenv");
const User = require("../models/UserModel");
env.config();
const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, async function (err, user) {
    // console.log(token)

    if (err) {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
    const data = await User.findById(user.id);
    if (data.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "The authentication 2",
        status: "ERROR",
      });
    }
  });
};
const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  const userId = req.params.id;
  // console.log(token)
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authentication 1",
        status: "ERROR",
      });
    }
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "The authentication 2",
        status: "ERROR",
      });
    }
  });
};
module.exports = { authMiddleware, authUserMiddleware };
