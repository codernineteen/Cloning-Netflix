import classes from "./AuthInput.module.css";

const AuthInput = (props) => {
  let dynamicInputClass = classes["input-" + props.id];
  dynamicInputClass = props.invalid
    ? `${classes["input-" + props.id]} ${classes.invalid}`
    : `${classes["input-" + props.id]}`;

  return (
    <div className={classes[`input-${props.id}-wrapper`]}>
      <input
        id={props.id}
        className={dynamicInputClass}
        value={props.value}
        type={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onClick={props.onClick}
      />
      <label
        className={
          props.isStaying || props.value ? classes[`${props.activeClass}`] : ""
        }
        htmlFor={props.id}
      >
        {props.label}
      </label>
      {props.id === "email" && props.invalid && props.value.length > 5 && (
        <p className={classes["error-text"]}>{props.errorFormatText}</p>
      )}
      {props.id === "email" && props.invalid && props.value.length < 5 && (
        <p className={classes["error-text"]}>{props.errorShortText}</p>
      )}
      {props.id === "password" && props.invalid && (
        <p className={classes["error-text"]}>{props.errorText}</p>
      )}
    </div>
  );
};

export default AuthInput;
