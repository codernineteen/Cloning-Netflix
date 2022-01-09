import { useState } from "react";

//onHover => boolean state change => a bigger detail snapshot component
import classes from "./Video.module.css";

const Video = (props) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const mouseOverHandler = () => {
    setIsMouseOver(true);
  };

  const mouseOutHandler = () => {
    setIsMouseOver(false);
  };

  return (
    <div
      className={classes["video-items"]}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    >
      {!isMouseOver && props.image}
      <div className={classes["video-item-wrapper"]}>
        <video loop={false} poster={props.poster}>
          <source src={props.videoSrc} type="video/mp4" />
        </video>
        <div className={classes["video-item-buttons"]}>
          <button>play</button>
          <button>mylist</button>
          <button>detail</button>
        </div>
        <p className={classes["video-item-info"]}>
          <span>rating</span>
          season
        </p>
        <p className={classes["video-item-features"]}>
          <span>feature1</span>
          <span>feature1</span>
          <span>feature1</span>
        </p>
      </div>
    </div>
  );
};

export default Video;
