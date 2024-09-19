const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { authUserMiddleware } = require("../middlewares/authMiddleware");

router.get("/config", (req, res) => {
  return res.status(200).json({
    status: "SUCCESS",
    data: process.env.CLIENT_ID,
  });
});

module.exports = router;
