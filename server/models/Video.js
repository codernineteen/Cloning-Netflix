import mongoose from "mongoose";

const EpisodeSchema = new mongoose.Schema({
  episodeTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  runningTime: {
    type: String,
  },
  episodeThumb: {
    type: String,
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
  previewThumbSrc: {
    type: String,
  },
  overviewThumbSrc: {
    type: String,
  },
  videoSrc: {
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
  season: {
    type: Number,
    default: 1,
  },
  rating: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
    required: true,
  },
});

export const video = mongoose.model("Video", VideoSchema);
