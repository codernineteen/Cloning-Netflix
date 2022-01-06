import axios from "axios";
import { useState } from "react";

const useAuthRequeset = async (email, password) => {
  const [success, setSuccess] = useState(false);
  const response = await axios.post(
    "/login",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (response.user) {
    setSuccess(true);
  }
  return { success };
};

export default useAuthRequeset;
