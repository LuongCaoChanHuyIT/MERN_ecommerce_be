const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JWTService");
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = newUser;
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({ status: "OK", message: "The email is already" });
      }
      const hash = bcrypt.hashSync(password, 10);
      console.log(hash);
      const createdUser = new User({
        email,
        password: hash,
      });
      createdUser.save();
      if (createdUser) {
        resolve({ status: "OK", message: "SUCCESS", data: createdUser });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const loginUser = (loginUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = loginUser;
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser) {
        const comparePassword = bcrypt.compareSync(
          password,
          checkUser.password
        );
        if (!comparePassword) {
          resolve({
            status: "OK",
            message: "The password or user is incorrect ",
          });
        } else {
          const payload = { id: checkUser.id, isAdmin: checkUser.isAdmin };
          const access_token = await generalAccessToken(payload);
          const refresh_token = await generalRefreshToken(payload);

          resolve({
            status: "OK",
            message: "SUCCESS",
            access_token,
            refresh_token,
          });
        }
      } else {
        resolve({ status: "OK", message: "The user is not define" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      if (checkUser === null) {
        resolve({ status: "OK", message: "The user is not defined" });
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

      resolve({ status: "OK", message: "SUCCESS", data: updatedUser });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
      if (checkUser === null) {
        resolve({ status: "OK", message: "The user is not defined" });
      }
      await User.findByIdAndDelete(id);

      resolve({ status: "OK", message: "SUCCESS" });
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();

      resolve({ status: "OK", message: "SUCCESS", data: allUser });
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id);
      if (user === null) {
        resolve({ status: "OK", message: "The user is not define" });
      }
      resolve({ status: "OK", message: "SUCCESS", data: user });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
};
