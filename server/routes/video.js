import express from "express";
import {
  addToMyList,
  createVideo,
  getAllMyList,
  getAllVideos,
  getSingleVideo,
  getVideosFilteredByGenre,
} from "../controllers/videoController";
import { checkToken } from "../middleware/authUser";

const router = express.Router();

router.route("/browse").get(checkToken, getAllVideos).post(createVideo);
router.route("/browse/my-list").get(getAllMyList).patch(addToMyList);
router.route("/browse/genre").get(checkToken, getVideosFilteredByGenre);

router.route("/watch/:videoId").get(getSingleVideo);

export default router;
