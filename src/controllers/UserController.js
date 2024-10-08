const UserService = require("../services/UserService");
const JWTService = require("../services/JWTService");
const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isCheckEmail = re.test(email);
    if (!email || !password) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is required" });
    } else if (!isCheckEmail) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is email" });
    } else if (password !== confirmPassword) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The password is equal" });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isCheckEmail = re.test(email);
    if (!email || !password) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is required" });
    } else if (!isCheckEmail) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The input is email" });
    }
    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      samesite: "strict",
      path: "/",
    });
    return res.status(200).json({ ...newResponse, refresh_token });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The userId is required" });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The userId is required" });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await UserService.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];

    if (!token) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The token is required" });
    }
    const response = await JWTService.refreshTokenJWT(token);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ status: "OK", message: "Logout success" });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const deleteMany = async (req, res) => {
  try {
    const ids = req.body;

    if (ids.length == []) {
      return res
        .status(200)
        .json({ status: "ERR", message: "The id is required" });
    } else {
      const response = await UserService.deleteMany(ids);
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  refreshToken,
  logoutUser,
  deleteMany,
};
