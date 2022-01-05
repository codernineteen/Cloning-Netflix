import mongoose from "mongoose";

const EpisodeSchema = new mongoose.Schema({
  episodeTitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  runningTime: {
    type: String,
    required: true,
  },
  season: {
    type: Number,
    default: 1,
  },
});

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  characteristic: {
    type: Array,
    required: true,
  },
  genre: {
    type: Array,
  },
  episode: [EpisodeSchema],
  src: {
    type: String,
  },
  myList: {
    type: Array,
    default: [],
  },
  numOfView: {
    type: Number,
    default: 0,
  },
});

export const video = mongoose.model("Video", VideoSchema);
