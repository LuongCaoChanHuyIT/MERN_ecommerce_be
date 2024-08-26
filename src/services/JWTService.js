const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const generalAccessToken = async (payload) => {
  const accessToken = jwt.sign({ payload }, process.env.ACCESS_TOKEN, {
    expiresIn: "30s",
  });
  return accessToken;
};
const generalRefreshToken = async (payload) => {
  const refreshToken = jwt.sign({ payload }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });
  return refreshToken;
};
const refreshTokenJWT = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({ status: "ERROR", massege: "The authentication" });
        }

        const { payload } = user;
        const access_token = await generalAccessToken({
          id: payload?.id,
          idAdmin: payload?.idAdmin,
        });
        console.log(access_token);
        resolve({ status: "OK", message: "SUCCESS", access_token });
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { generalAccessToken, generalRefreshToken, refreshTokenJWT };
