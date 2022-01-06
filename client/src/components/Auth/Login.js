import { useForm } from "../../hooks/index";
import { useState } from "react";

import { sendLoginRequest } from "../../api";

import classes from "./Login.module.css";
import "../../App.css";

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState({
    msg: "",
    status: "pending",
  });
  const {
    value: emailValue,
    invalidInput: invalidEmail,
    staying: emailStaying,
    inputValueHandler: emailInputHandler,
    inputClickHandler: emailClicked,
    inputBlurHandler: emailBlurHandler,
  } = useForm((value) => {
    return String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  });

  const {
    value: passwordValue,
    invalidInput: invalidPassword,
    staying: passwordStaying,
    inputValueHandler: passwordInputHandler,
    inputClickHandler: passwordClicked,
    inputBlurHandler: passwordBlurHandler,
  } = useForm((value) => value.trim().length > 4 && value.trim().length < 60);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (!invalidEmail || !invalidPassword) {
      const result = await sendLoginRequest(emailValue, passwordValue);
      if (result.msg === "success") {
        setLoginSuccess({ msg: "success", status: "success" });
      } else if (result.msg === "email not existed") {
        setLoginSuccess({ msg: "email not existed", status: "failed" });
      } else {
        setLoginSuccess({ msg: "password incorrect", status: "failed" });
      }
    }
  };

  let emailInputClass = `${classes["input-email"]}`;
  if (invalidEmail) {
    emailInputClass = invalidEmail
      ? `${classes["input-email"]} ${classes.invalid}`
      : `${classes["input-email"]}`;
  }

  let passwordInputClass = `${classes["input-password"]}`;
  if (invalidPassword) {
    passwordInputClass = invalidPassword
      ? `${classes["input-password"]} ${classes.invalid}`
      : `${classes["input-password"]}`;
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
          <form onSubmit={submitFormHandler}>
            <div className={classes["form-control"]}>
              <h1>로그인</h1>
              {loginSuccess.status === "failed" &&
                loginSuccess.msg === "email not existed" && (
                  <div className={classes["error-box"]}>
                    죄송합니다. 이 이메일 주소를 사용하는 계정을 찾을 수
                    없습니다. 다시 시도하거나 새로운 계정을 등록하세요
                  </div>
                )}
              {loginSuccess.status === "failed" &&
                loginSuccess.msg === "password incorrect" && (
                  <div className={classes["error-box"]}>
                    비밀번호를 잘못 입력하셨습니다. 다시 입력하시거나 비밀번호를
                    재설정하세요.
                  </div>
                )}
              <div className={classes["input-email-wrapper"]}>
                <input
                  id="email"
                  className={emailInputClass}
                  value={emailValue}
                  type="email"
                  onChange={emailInputHandler}
                  onBlur={emailBlurHandler}
                  onClick={emailClicked}
                />
                <label
                  className={
                    emailStaying || emailValue
                      ? classes["active-label-email"]
                      : ""
                  }
                  htmlFor="email"
                >
                  이메일 주소 또는 전화번호
                </label>
                {invalidEmail && (
                  <p className={classes["error-text"]}>
                    정확한 이메일 주소나 전화번호를 입력하세요.
                  </p>
                )}
              </div>
              {/* {isInvalidEmail && <p className={classes['error-text']}>정확한 이메일 주소나 전화번호를 입력하세요.</p>} */}
              <div className={classes["input-password-wrapper"]}>
                <input
                  id="password"
                  className={passwordInputClass}
                  value={passwordValue}
                  type="password"
                  onChange={passwordInputHandler}
                  onBlur={passwordBlurHandler}
                  onClick={passwordClicked}
                />
                <label
                  className={
                    passwordStaying || passwordValue
                      ? classes["active-label-password"]
                      : ""
                  }
                  htmlFor="password"
                >
                  비밀번호
                </label>
                {invalidPassword && (
                  <p className={classes["error-text"]}>
                    비밀번호는 4 - 60자 사이여야 합니다.
                  </p>
                )}
              </div>
              {/* {isInvalidPassword && <p className={classes['error-text']}>정확한 이메일 주소나 전화번호를 입력하세요.</p>} */}
              <button
                disabled={invalidEmail || invalidPassword}
                className={classes.button}
              >
                로그인
              </button>
            </div>
          </form>
          <p className={classes.register}>
            Comflix 회원이 아닌가요? <a href="/register">지금 가입하세요</a>.
          </p>
          <p className={classes.captcha}>
            이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 롯봇이 아님을
            확인합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
