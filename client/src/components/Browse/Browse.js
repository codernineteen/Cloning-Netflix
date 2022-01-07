import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserAuthenticated } from "../../api";

const Browse = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const getResult = async () => {
      const result = await checkUserAuthenticated();
      if (result.msg === "unauthorized") {
        navigate("/login", { replace: true });
      }
    };
    getResult();
  }, [navigate]);
  return <button>Send request</button>;
};

export default Browse;
