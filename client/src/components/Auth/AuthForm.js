import classes from "./AuthForm.module.css";

import { Fragment } from "react";
import AuthInput from "./AuthInput";

const AuthForm = (props) => {
  return (
    <Fragment>
      <form onSubmit={props.onSubmit}>
        <div className={classes["form-control"]}>
          <AuthInput
            id="email"
            wrapperClass="input-email-warpper"
            value={props.emailValue}
            onChange={props.onEmailChange}
            onBlur={props.onEmailBlur}
            onClick={props.onEmailClick}
            isStaying={props.isEmailStaying}
            activeClass="active-label-email"
            label="이메일 주소 또는 전화번호"
            invalid={props.invalidEmail}
            errorFormatText={props.emailFormatErrorText}
            errorShortText={props.emailShortErrorText}
          />

          <AuthInput
            id="password"
            wrapperClass="input-password-warpper"
            value={props.pwdValue}
            onChange={props.onPwdChange}
            onBlur={props.onPwdBlur}
            onClick={props.onPwdClick}
            isStaying={props.isPwdStaying}
            activeClass="active-label-password"
            label="비밀번호"
            invalid={props.invalidPwd}
            errorText={props.pwdErrorText}
          />

          <button disabled={props.invalidEmail || props.invalidPwd}>
            {props.buttonText}
          </button>
        </div>
      </form>
      <p className={classes.link}>{props.linkText}</p>
      <p className={classes.captcha}>
        이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을
        확인합니다.
      </p>
    </Fragment>
  );
};

export default AuthForm;
