import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const refresh = mongoose.model("Refresh", RefreshTokenSchema);
