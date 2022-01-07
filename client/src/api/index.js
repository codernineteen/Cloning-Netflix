import axios from "axios";
const url = "http://localhost:5000";
axios.defaults.withCredentials = true;

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
      return { msg: "success", token: response };
    }
  } catch (error) {
    if (error.response.status === 404) {
      return { msg: "email not existed" };
    } else if (error.response.status === 401) {
      return { msg: "password incorrect" };
    }
  }
};

export const sendRegisterRequest = async (email, password) => {
  try {
    const response = await axios.post(
      `${url}/auth/register`,
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
    if (response.data.msg === "registeration success") {
      return { msg: "success" };
    }
  } catch (error) {
    if (error.response.status === 400) {
      return { msg: "empty input" };
    } else if (error.response.status === 409) {
      return { msg: "email existed" };
    }
  }
};

export const checkUserAuthenticated = async () => {
  try {
    const response = await axios.get("http://localhost:5000/token");
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      return { msg: "unauthorized" };
    }
  }
};
