import { video } from "../models/Video";

export const getAllVideos = async (req, res) => {
  const videos = await video.find({});
  res.status(200).json({ videos });
};

export const getSingleVideo = async (req, res) => {
  const { videoId } = req.params;
  const singleVideo = await video.findById(videoId);
  if (!video) {
    return res
      .status(404)
      .json({ msg: "video not found with id : " + videoId });
  }
  res.status(200).json({ singleVideo });
};

export const createVideo = async (req, res) => {
  const newVideo = await video.create(req.body);
  res.status(201).json({ newVideo });
};

export const getVideosFilteredByGenre = async (req, res) => {
  const { sp } = req.query;
  let videos;
  if (sp) {
    videos = await video.find({ genre: sp });
    return res.status(200).json({ videos });
  }
  videos = await video.find({});
  res.status(200).json({ videos });
};

export const addToMyList = async (req, res) => {
  const currentUserId = req.cookies.userIdentifier;
  const { videoId } = req.body;
  const videoWithId = await video.findOneAndUpdate(
    { _id: videoId },
    { $push: { myList: currentUserId } }
  );
  res.status(200).json({ videoWithId });
};

export const getAllMyList = async (req, res) => {
  const currentUserId = req.cookies.userIdentifier;
  const videosInMyList = await video.find({ myList: currentUserId });
  res.status(200).json({ videosInMyList });
};
