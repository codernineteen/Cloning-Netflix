import { useState } from "react";

const useForm = (validator) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [staying, setStaying] = useState(false);

  const validInput = validator(value);
  const invalidInput = !validInput && touched;

  const inputValueHandler = (evt) => {
    setValue(evt.target.value);
  };

  const inputClickHandler = () => {
    setStaying(true);
  };

  const inputBlurHandler = () => {
    setTouched(true);
    setStaying(false);
  };

  return {
    value,
    invalidInput,
    staying,
    inputValueHandler,
    inputClickHandler,
    inputBlurHandler,
  };
};

export default useForm;
