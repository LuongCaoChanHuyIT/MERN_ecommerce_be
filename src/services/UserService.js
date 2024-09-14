const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JWTService");
const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, email, password, confirmPassword, phone, address, avatar } =
        newUser;
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({ status: "SUCCESS" });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = new User({
        name,
        email,
        password: hash,
        phone,
        address,
        avatar,
      });
      createdUser.save();
      if (createdUser) {
        resolve({ status: "SUCCESS", data: createdUser });
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
            status: "SUCCESS",
          });
        } else {
          const payload = { id: checkUser.id, isAdmin: checkUser.isAdmin };
          const access_token = await generalAccessToken(payload);
          const refresh_token = await generalRefreshToken(payload);

          resolve({
            status: "SUCCESS",
            access_token,
            refresh_token,
          });
        }
      } else {
        resolve({ status: "SUCCESS" });
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
        resolve({ status: "SUCCESS" });
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

      resolve({ status: "SUCCESS", data: updatedUser });
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
        resolve({ status: "SUCCESS" });
      }
      await User.findByIdAndDelete(id);

      resolve({ status: "SUCCESS" });
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();

      resolve({ status: "SUCCESS", data: allUser });
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
        resolve({ status: "SUCCESS" });
      }
      resolve({ status: "SUCCESS", data: user });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteMany = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await User.deleteMany({ _id: ids });

      resolve({ status: "SUCCESS" });
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
  deleteMany,
};
