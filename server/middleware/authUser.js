import {
  verifyToken,
  createAccessToken,
  createRefreshToken,
} from "../utils/jwt";
import { refresh } from "../models/RefreshToken";
import { user } from "../models/User";

export const checkToken = async (req, res, next) => {
  const userIdentifier = req.cookies.userIdentifier;
  if (!userIdentifier) {
    return res.status(400).json({ msg: "you can't use this route" });
  }
  const currentUser = await user.findById(userIdentifier);
  const refreshTokenWithUSer = await refresh.findOne({ user: userIdentifier });
  let refreshToken, accessToken, isRefreshValid, isAccessValid;
  try {
    refreshToken = verifyToken(refreshTokenWithUSer.token);
  } catch (err) {
    isRefreshValid = false;
  }
  try {
    accessToken = verifyToken(req.cookies.accessToken);
  } catch (err) {
    isAccessValid = false;
  }

  if (isAccessValid === false) {
    if (isRefreshValid === false) {
      res.status(401).json({ msg: "You are not allowed to use service" });
    } else {
      const newAccessToken = createAccessToken(
        currentUser.email,
        userIdentifier
      );
      res.cookie("accessToken", newAccessToken);
      req.cookies.accessToken = newAccessToken;
      next();
    }
  } else {
    if (!refreshToken) {
      const newRefreshToken = createRefreshToken();
      await refresh.create({
        refreshToken: newRefreshToken,
        user: userIdentifier,
      });
      res.cookie("refreshToken", newRefreshToken);
      req.cookies.refreshToken = newRefreshToken;
      next();
    } else {
      next();
    }
  }
};
