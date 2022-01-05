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
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));
app.use("/auth", authRouter);
app.use("/", videoRouter);

//routes
// app.get("/browse", checkToken, (req, res) => {
//   res.json({ msg: "Accepted, this is index page" });
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log("Server runnning and db connected"));
  } catch (error) {
    console.log(error.message);
  }
};

start();
