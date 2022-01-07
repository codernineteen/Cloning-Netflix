import {
  verifyToken,
  createAccessToken,
  createRefreshToken,
} from "../utils/jwt";
import { refresh } from "../models/RefreshToken";
import { user } from "../models/User";

export const checkToken = async (req, res) => {
  const userIdentifier = req.cookies.userIdentifier;
  if (!userIdentifier) {
    return res.status(401).json({ msg: "you can't use this route" });
  }
  const currentUser = await user.findById(userIdentifier);
  const refreshTokenWithUser = await refresh.findOne({ user: userIdentifier });
  let refreshToken, accessToken, isRefreshValid, isAccessValid;
  try {
    refreshToken = verifyToken(refreshTokenWithUser.token);
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
      return res
        .status(401)
        .json({ msg: "You are not allowed to use service" });
    } else {
      const newAccessToken = createAccessToken(
        currentUser.email,
        userIdentifier
      );
      res.cookie("accessToken", newAccessToken);
      req.cookies.accessToken = newAccessToken;
      return res.status(202).json({ msg: "accessToken created, accepted" });
    }
  } else {
    if (isRefreshValid === false) {
      const newRefreshToken = createRefreshToken();
      await refresh.create({
        refreshToken: newRefreshToken,
        user: userIdentifier,
      });
      res.cookie("refreshToken", newRefreshToken);
      req.cookies.refreshToken = newRefreshToken;
      return res.status(202).json({ msg: "refreshToken created, accepted" });
    } else {
      return res.status(202).json({ msg: "accepted" });
    }
  }
};
