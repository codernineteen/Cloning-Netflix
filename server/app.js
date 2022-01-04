//pacakges
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//custom modules
import { connectDB } from "./db/connect.js";
import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

//routes
app.get("/", (req, res) => {
  res.send("home");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log("Server runnning and db connected"));
  } catch (error) {
    console.log(error.message);
  }
};

start();
