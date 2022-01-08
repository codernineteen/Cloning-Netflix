import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserAuthenticated } from "../../api";
import Arcane from "../../assets/video/arcane.mp4";
import ArcaneLogo from "../../assets/image/arcane_logo.png";
import ArcaneThumb from "../../assets/image/arcane_thumb.jpg";

import classes from "./Browse.module.css";

import Layout from "../ui/Layout";

const Browse = () => {
  const [mute, setMute] = useState(true);
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

  // const playVideo = () => {
  //   videoRef.current.play();
  // };

  const muteHandler = () => {
    setMute((prev) => !prev);
  };

  return (
    <Layout>
      <div className={classes.content}>
        <div className={classes["billboard-row"]}>
          <div className={classes["wrapper-video"]}>
            <video
              className={classes["main-video"]}
              autoPlay={true}
              muted={mute}
              loop={false}
              ref={videoRef}
              // needed transition between poster and video playing
              poster={ArcaneThumb}
            >
              <source src={Arcane} type="video/mp4" />
            </video>
          </div>
          <div className={classes.billboard}>
            <div className={classes["billboard-title"]}>
              <img
                src={ArcaneLogo}
                alt="arcane_title"
                width="328"
                height="134"
              />
            </div>
            {/* change this hard code later from database */}
            <p className={classes["billboard-description"]}>
              지상 도시 필트오버와 그 아래의 지하 도시 자운. 극심하게 반목하는
              두 쌍둥이 도시에서, 두 자매가 서로 반대편에 서서 싸우기에 이른다.
              마법 기술과 신념의 충돌 속에서 전쟁이 시작된다.
            </p>
            <button className={classes["billboard-play"]}>
              <div className={classes["billboard-play-wrapper"]}>
                <img
                  src="https://img.icons8.com/glyph-neue/64/000000/play.png"
                  alt="play_button_icon"
                  width="20px"
                  height="20px"
                />
                <p>재생</p>
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
          <div className={classes["billboard-replay-wrapper"]}>
            <button
              onClick={muteHandler}
              className={classes["billboard-replay"]}
            >
              <img
                src="https://img.icons8.com/ios-filled/24/ffffff/rotate.png"
                alt="replay_button_icon"
                width="18px"
                height="18px"
              />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
