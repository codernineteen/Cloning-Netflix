//hooks
import { useEffect, useRef, useState } from "react";

//component
import CSSTransition from "react-transition-group/CSSTransition";
import Arcane from "../../assets/video/arcane.mp4";
import ArcaneLogo from "../../assets/image/arcane_logo.png";
import ArcaneThumb from "../../assets/image/arcane_thumb.jpg";

import classes from "./Billboard.module.css";

const Billboard = () => {
  const [mute, setMute] = useState(true);
  const [shrink, setShrink] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef();

  const endVideo = () => {
    videoRef.current.currentTime = 152;
  };

  const playVideo = () => {
    videoRef.current.play();
    setShrink(false);
  };

  const muteHandler = () => {
    setMute((prev) => !prev);
  };

  const videoReload = () => {
    videoRef.current.load();
    setCurrentTime(0);
    setIsPlayed(false);
    setShrink(false);
  };

  const checkVideoPlayed = () => {
    setIsPlayed(true);
  };

  const updateCurrentTime = () => {
    const videoElement = videoRef.current;
    setCurrentTime(videoElement.currentTime);
    if (currentTime > 4) {
      setShrink(true);
    }
  };

  useEffect(() => {
    playVideo();
  }, []);

  let billboardTitleClasses = shrink
    ? `${classes["billboard-title"]} ${classes.shrink}`
    : `${classes["billboard-title"]}`;
  return (
    <div className={classes["billboard-row"]}>
      <div className={classes["wrapper-video"]}>
        <video
          className={classes["main-video"]}
          muted={mute}
          loop={false}
          ref={videoRef}
          // needed transition between poster and video playing
          poster={ArcaneThumb}
          onEnded={videoReload}
          onPlaying={checkVideoPlayed}
          onTimeUpdate={updateCurrentTime}
        >
          <source src={Arcane} type="video/mp4" />
        </video>
      </div>
      <div className={classes.billboard}>
        <div className={billboardTitleClasses}>
          <img src={ArcaneLogo} alt="arcane_title" />
        </div>
        <CSSTransition
          in={!shrink}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          classNames={{
            exitActive: classes["fade-exit-active"],
          }}
        >
          <p className={classes["billboard-description"]}>
            지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게 반목하는 두
            쌍둥이 도시에서, 두 자매가 서로 반대편에 서서 싸우기에 이른다. 마법
            기술과 신념의 충돌 속에서 전쟁이 시작된다.
          </p>
        </CSSTransition>

        <button className={classes["billboard-play"]}>
          <div className={classes["billboard-play-wrapper"]}>
            <img
              src="https://img.icons8.com/glyph-neue/64/000000/play.png"
              alt="play_button_icon"
              width="20px"
              height="20px"
            />
            <p onClick={endVideo}>재생</p>
          </div>
        </button>
        <button className={classes["billboard-detail"]}>
          <div className={classes["billboard-detail-wrapper"]}>
            <img
              src="https://img.icons8.com/pastel-glyph/64/ffffff/info--v1.png"
              alt="detail_button_icon"
              width="20px"
              height="20px"
            />
            <p>상세정보</p>
          </div>
        </button>
      </div>
      {isPlayed && (
        <div className={classes["billboard-mute-wrapper"]}>
          <button onClick={muteHandler} className={classes["billboard-mute"]}>
            <img
              src={
                mute
                  ? "https://img.icons8.com/ios-filled/50/ffffff/mute--v1.png"
                  : "https://img.icons8.com/ios-filled/50/ffffff/room-sound.png"
              }
              alt="mute_control_button_icon"
              width="18px"
              height="18px"
            />
          </button>
        </div>
      )}
      {!isPlayed && (
        <div className={classes["billboard-replay-wrapper"]}>
          <button className={classes["billboard-replay"]} onClick={playVideo}>
            <img
              src="https://img.icons8.com/ios-filled/24/ffffff/rotate.png"
              alt="replay_button_icon"
              width="18px"
              height="18px"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Billboard;
