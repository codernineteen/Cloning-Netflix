import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const createAccessToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    issuer: "yechan",
  });
};

export const createRefreshToken = () => {
  return jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: "1d",
    issuer: "yechan",
  });
};
