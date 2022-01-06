import axios from "axios";

const url = "http://localhost:5000";

export const sendLoginRequest = async (email, password) => {
  try {
    const response = await axios.post(
      `${url}/auth/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (response.data.msg === "login success") {
      return { msg: "success" };
    }
  } catch (error) {
    if (error.response.status === 404) {
      return { msg: "email not existed" };
    } else if (error.response.status === 401) {
      return { msg: "password incorrect" };
    }
  }
};
