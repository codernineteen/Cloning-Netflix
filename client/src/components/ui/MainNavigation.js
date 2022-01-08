import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const [isTop, setIsTop] = useState(true);
  const checkScrollLocation = () => {
    const position = window.scrollY;
    if (position !== 0) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", checkScrollLocation);
  }, []);

  let headerClasses = isTop
    ? `${classes.header}`
    : `${classes.header} ${classes.noGradient}`;

  return (
    <header className={headerClasses}>
      <div className={classes.logo}>
        <Link to="/browse">
          <img
            src="https://fontmeme.com/permalink/220103/76f56de23cf275828fb3a4db720cdf24.png"
            alt="logo"
          />
        </Link>
      </div>
      <nav className={classes.nav}>
        <ul className={classes["list-menu"]}>
          <li className={classes["list-item"]}>홈</li>
          <li className={classes["list-item"]}>영화</li>
          <li className={classes["list-item"]}>내가찜한 콘텐츠</li>
        </ul>
      </nav>
      <div className={classes.profile}>
        <div className={classes["profile-item"]}>profile</div>
      </div>
    </header>
  );
};

export default MainNavigation;
