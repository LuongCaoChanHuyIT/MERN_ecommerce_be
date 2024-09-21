const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const generalAccessToken = async (payload) => {
  const access_token = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN, {
    expiresIn: "1d",
  });
  return access_token;
};
const generalRefreshToken = async (payload) => {
  const refresh_token = jwt.sign({ ...payload }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });
  return refresh_token;
};
const refreshTokenJWT = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({ status: "ERR", massege: err });
        }
        const access_token = await generalAccessToken({
          id: user?.id,
          idAdmin: user?.idAdmin,
        });
        resolve({
          status: "SUCCESS",
          message: "The new token",
          access_token,
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = { generalAccessToken, generalRefreshToken, refreshTokenJWT };
