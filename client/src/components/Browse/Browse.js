//hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//api
import { checkUserAuthenticated, getAllVideos } from "../../api";
//stylesheet
import classes from "./Browse.module.css";
//component
import Layout from "../ui/Layout";
import Billboard from "./Billboard";
import VideosRow from "./VideosRow";

const Browse = () => {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      const result = await checkUserAuthenticated();
      if (result.msg === "unauthorized") {
        navigate("/login", { replace: true });
      }
    };

    const fetchVideoData = async () => {
      const data = await getAllVideos();
      setVideoData(data);
    };
    getResult();
    fetchVideoData();
  }, [navigate]);

  return (
    <Layout>
      <div className={classes["billboard-content"]}>
        <Billboard />
      </div>
      <div className={classes["video-content"]}>
        <VideosRow data={videoData} />
      </div>
      <div className={classes["video-content"]}>
        <VideosRow data={videoData} />
      </div>
      <div className={classes["video-content"]}>
        <VideosRow data={videoData} />
      </div>
      <div className={classes["video-content"]}>
        <VideosRow data={videoData} />
      </div>
    </Layout>
  );
};

export default Browse;
