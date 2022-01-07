//pacakges
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//custom modules
import { connectDB } from "./db/connect.js";
import authRouter from "./routes/auth.js";
import videoRouter from "./routes/video.js";
import { checkToken } from "./middleware/authUser.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//다른 도메인간 쿠키 전송을 위한 세팅
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//middleware
app.use(express.json());
//다른 도메인간 쿠키 전송을 위한 세팅
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/auth", authRouter);
// app.use(checkToken);
app.use("/", videoRouter);
app.get("/token", checkToken);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log("Server runnning and db connected"));
  } catch (error) {
    console.log(error.message);
  }
};

start();
