import { user } from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSalt();
  const encryptedPassword = bcrypt.hash(password, salt);
  const newUser = await user.create({ email, password: encryptedPassword });
  res.json({ msg: "registeration completed", newUser });
};
export const login = (req, res) => {
  res.send("login");
};
export const logout = (req, res) => {
  res.send("logout");
};
