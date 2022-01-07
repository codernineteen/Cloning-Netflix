import { Link } from "react-router-dom";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link to="/browse">
            <img
              src="https://fontmeme.com/permalink/220103/76f56de23cf275828fb3a4db720cdf24.png"
              alt="logo"
            />
          </Link>
        </div>
      </header>
      <main className={classes.main}>
        <div className={classes.content}>
          <div className={classes.description}>
            <h1>길을 잃으셨나요?</h1>
            <p>
              죄송합니다. 해당 페이지를 찾을 수 없습니다. 홈페이지로 이동해
              다양한 콘텐츠를 만나보세요.
            </p>
            <Link to="/browse">Comflix홈</Link>
          </div>
          <div className={classes.code}>
            <p>오류 코드 : NSES-404</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
