import { useState } from "react";

import classes from "./Login.module.css";
import "../../App.css";
// Validation 순서: 클릭 후(focus) 포커싱 해제시 (Blur) validation시작
// 모든 타이핑에 validation 적용

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [touched, setTouched] = useState(false);

  const validEmail = String(emailInput)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  const invalidEmail = !validEmail && touched;
  console.log(invalidEmail, touched);
  const emailInputHandler = (evt) => {
    setEmailInput(evt.target.value);
  };

  const passwordInputHandler = (evt) => {
    setPasswordInput(evt.target.value);
  };

  const touchHandler = () => {
    setTouched(true);
  };

  let emailInputClass = `${classes["input-email"]}`;
  if (invalidEmail) {
    emailInputClass = invalidEmail
      ? `${classes["input-email"]} ${classes.invalid}`
      : `${classes["input-email"]}`;
  }

  return (
    <div className={classes.background}>
      <div className={classes.logo}>
        <img
          src="https://fontmeme.com/permalink/220103/76f56de23cf275828fb3a4db720cdf24.png"
          alt="logo"
          width="175"
          height="50"
        />
      </div>
      <div className={classes.container}>
        <div className={classes.card}>
          <form>
            <div className={classes["form-control"]}>
              <h1>로그인</h1>
              <div className={classes["input-email-wrapper"]}>
                <input
                  className={emailInputClass}
                  value={emailInput}
                  type="text"
                  placeholder="이메일 주소 또는 전화번호"
                  onChange={emailInputHandler}
                  onBlur={touchHandler}
                />
                {invalidEmail && (
                  <p className={classes["error-text"]}>
                    정확한 이메일 주소나 전화번호를 입력하세요.
                  </p>
                )}
              </div>
              {/* {isInvalidEmail && <p className={classes['error-text']}>정확한 이메일 주소나 전화번호를 입력하세요.</p>} */}
              <div className={classes["input-password-wrapper"]}>
                <input
                  className={classes["input-password"]}
                  value={passwordInput}
                  type="password"
                  placeholder="비밀번호"
                  onChange={passwordInputHandler}
                />
              </div>
              {/* {isInvalidPassword && <p className={classes['error-text']}>정확한 이메일 주소나 전화번호를 입력하세요.</p>} */}
              <button className={classes.button}>로그인</button>
            </div>
          </form>
          <p>Comflix 회원이 아닌가요? 지금 가입하세요.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
