//hooks
import { useForm } from "../../hooks/index";
import { useState } from "react";
//api
import { sendRegisterRequest } from "../../api";
//component and style
import classes from "./RegisterCard.module.css";
import "../../App.css";
import AuthForm from "./AuthForm";
//router
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [registerSuccess, setRegisterSuccess] = useState({
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
    if (value.trim().length < 5) {
      return false;
    } else {
      return String(value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
  });

  const {
    value: passwordValue,
    invalidInput: invalidPassword,
    staying: passwordStaying,
    inputValueHandler: passwordInputHandler,
    inputClickHandler: passwordClicked,
    inputBlurHandler: passwordBlurHandler,
  } = useForm((value) => value.trim().length >= 6 && value.trim().length <= 60);

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (!invalidEmail || !invalidPassword) {
      const result = await sendRegisterRequest(emailValue, passwordValue);
      if (result.msg === "success") {
        setRegisterSuccess({ msg: "success", status: "success" });
        navigate("/login");
        alert("Comflix의 멤버가 되신 것을 진심으로 환영합니다!");
      } else if (result.msg === "email existed") {
        setRegisterSuccess({ msg: "email existed", status: "failed" });
      } else {
        setRegisterSuccess({ msg: "empty input", status: "failed" });
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
          <h1 className={classes.title}>회원가입</h1>
          {registerSuccess.status === "failed" &&
            registerSuccess.msg === "email existed" && (
              <div className={classes["error-box"]}>
                이미 존재하는 계정입니다.{" "}
                <Link to="/Login">해당 계정에 로그인</Link>하거나 다른 이메일을
                사용하세요.
              </div>
            )}
          {registerSuccess.status === "failed" &&
            registerSuccess.msg === "empty input" && (
              <div className={classes["error-box"]}>
                빈 입력을 제출 할 수 없습니다. 양식을 정확히 작성해주세요.
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
            emailShortErrorText="이메일은 5자리 이상입니다."
            emailFormatErrorText="정확한 이메일 주소를 입력하세요."
            pwdValue={passwordValue}
            onPwdChange={passwordInputHandler}
            onPwdBlur={passwordBlurHandler}
            onPwdClick={passwordClicked}
            isPwdStaying={passwordStaying}
            invalidPwd={invalidPassword}
            pwdErrorText="비밀번호는 6-60자 사이어야 합니다."
            buttonText="가입하기"
            linkText=""
          />
          <p className={classes.register}>
            이미 Comflix의 회원 이신가요? <Link to="/register">로그인하기</Link>
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
