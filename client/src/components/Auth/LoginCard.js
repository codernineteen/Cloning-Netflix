import { useForm } from "../../hooks/index";
import { useState } from "react";

import { sendLoginRequest } from "../../api";

import classes from "./Login.module.css";
import "../../App.css";
import AuthForm from "./AuthForm";

import { Link } from "react-router-dom";

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
        console.log(result);
        setLoginSuccess({ msg: "success", status: "success" });
      } else if (result.msg === "email not existed") {
        setLoginSuccess({ msg: "email not existed", status: "failed" });
      } else {
        setLoginSuccess({ msg: "password incorrect", status: "failed" });
      }
    }
  };

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
          <h1 className={classes.title}>로그인</h1>
          {loginSuccess.status === "failed" &&
            loginSuccess.msg === "email not existed" && (
              <div className={classes["error-box"]}>
                죄송합니다. 이 이메일 주소를 사용하는 계정을 찾을 수 없습니다.
                다시 시도하거나 <Link to="/register">새로운 계정을 등록</Link>
                하세요
              </div>
            )}
          {loginSuccess.status === "failed" &&
            loginSuccess.msg === "password incorrect" && (
              <div className={classes["error-box"]}>
                비밀번호를 잘못 입력하셨습니다. 다시 입력하시거나 비밀번호를
                재설정하세요.
              </div>
            )}
          <AuthForm
            onSubmit={submitFormHandler}
            emailValue={emailValue}
            onEmailChange={emailInputHandler}
            onEmailBlur={emailBlurHandler}
            onEmailClick={emailClicked}
            isEmailStaying={emailStaying}
            invalidEmail={invalidEmail}
            emailErrorText="정확한 이메일 주소나 전화번호를 입력하세요."
            pwdValue={passwordValue}
            onPwdChange={passwordInputHandler}
            onPwdBlur={passwordBlurHandler}
            onPwdClick={passwordClicked}
            isPwdStaying={passwordStaying}
            invalidPwd={invalidPassword}
            pwdErrorText="비밀번호는 4-60자 사이어야 합니다."
            buttonText="로그인"
            linkText=""
          />
          <p className={classes.register}>
            Comflix 회원이 아닌가요? <Link to="/register">지금 가입하세요</Link>
            .
          </p>
          <p className={classes.captcha}>
            이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을
            확인합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
