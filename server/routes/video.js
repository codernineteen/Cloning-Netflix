import express from "express";
import {
  addToMyList,
  createVideo,
  getAllMyList,
  getAllVideos,
  getSingleVideo,
  getVideosFilteredByGenre,
} from "../controllers/videoController";

const router = express.Router();

router.route("/browse").get(getAllVideos).post(createVideo);
router.route("/browse/my-list").get(getAllMyList).patch(addToMyList);
router.route("/browse/genre").get(getVideosFilteredByGenre);

router.route("/watch/:videoId").get(getSingleVideo);

export default router;
