import { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserAuthenticated } from "../../api";
import DontLookUp from "../../assets/video/dont.mp4";

import classes from "./Browse.module.css";

const Browse = () => {
  const videoRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const getResult = async () => {
      const result = await checkUserAuthenticated();
      if (result.msg === "unauthorized") {
        navigate("/login", { replace: true });
      }
    };
    getResult();
  }, [navigate]);

  const playVideo = () => {
    videoRef.play();
  };
  return (
    <Fragment>
      <video loop muted={false} ref={videoRef}>
        <source src={DontLookUp} type="video/mp4" />
      </video>
      <button className={classes.play} onClick={playVideo}>
        play
      </button>
    </Fragment>
  );
};

export default Browse;
