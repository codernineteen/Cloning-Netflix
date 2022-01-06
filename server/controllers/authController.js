import { user } from "../models/User.js";
import {
  createRefreshToken,
  createAccessToken,
  verifyToken,
} from "../utils/jwt.js";
import { refresh } from "../models/RefreshToken.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const newUser = await user.create({ email, password });
  res.json({ msg: "registeration completed", newUser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "You can't pass empty value among both inputs" });
  }
  const potentialUser = await user.findOne({ email });
  if (!potentialUser) {
    return res
      .status(404)
      .json({ msg: "There is no user with email : " + email });
  }

  const isPasswordMatch = await potentialUser.comparePassword(password);
  if (!isPasswordMatch) {
    res.status(401).json({ msg: "password incorrect" });
  }

  const accessToken = createAccessToken(email, potentialUser._id);
  let refreshToken = createRefreshToken();
  const existedRefreshToken = await refresh.findOne({
    user: potentialUser._id,
  });
  if (existedRefreshToken) {
    try {
      verifyToken(existedRefreshToken.token);
      refreshToken = existedRefreshToken.token;
    } catch (error) {
      await refresh.deleteOne({ user: potentialUser._id });
      await refresh.create({
        token: refreshToken,
        user: potentialUser._id,
      });
    }
  } else {
    await refresh.create({
      token: refreshToken,
      user: potentialUser._id,
    });
  }

  res.cookie("accessToken", accessToken, { httpOnly: true });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  res.cookie("userIdentifier", potentialUser._id, { httpOnly: true });

  res.status(202).json({ msg: "login success" });
};

export const logout = (req, res) => {
  res.cookie("accessToken", "logout", {
    expires: new Date(Date.now() + 0),
    httpOnly: true,
  });
  res.cookie("refreshToken", "logout", {
    expires: new Date(Date.now() + 0),
    httpOnly: true,
  });
  res.cookie("userIdentifier", "logout", {
    expires: new Date(Date.now() + 0),
    httpOnly: true,
  });
  res.status(200).json({ msg: "logged out" });
};
