import express from "express";
import { userValidtionRules, validate } from "../middleware/validatior.js";
import { register, login, logout } from "../controllers/authController";

const router = express.Router();

router.route("/register").post(userValidtionRules(), validate, register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
