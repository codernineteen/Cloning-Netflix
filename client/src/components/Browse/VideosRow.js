//api data fetching -> loop data with map method -> w
//wrap each video component with row container -> overflow hidden -> add carousel
import { Fragment, useRef, useState } from "react";
import Video from "./Video";
//stylesheet
import classes from "./VideosRow.module.css";

const VideosRow = (props) => {
  const [clicked, setClicked] = useState(false);
  const clickHandler = () => {
    setClicked(true);
  };
  const carouselClass = clicked
    ? `${classes["video-carousel"]}``${classes.move}`
    : `${classes["video-carousel"]}`;

  return (
    <Fragment>
      <button className={classes["button-prev"]}></button>
      <h1 className={classes["row-title"]}>지금 뜨는 콘텐츠</h1>
      <div className={carouselClass}>
        {props.data.map((video) => {
          return (
            <div className={classes["video-items"]}>
              <Video key={video._id} image={video.overviewThumbSrc} />
            </div>
          );
        })}
      </div>
      <button
        className={classes["button-next"]}
        onClick={clickHandler}
      ></button>
    </Fragment>
  );
};

export default VideosRow;
