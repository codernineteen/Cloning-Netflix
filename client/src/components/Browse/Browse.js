//hooks
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//api
import { checkUserAuthenticated } from "../../api";
//stylesheet
import classes from "./Browse.module.css";
//component
import Layout from "../ui/Layout";
import Billboard from "./Billboard";

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

  return (
    <Layout>
      <div className={classes.content}>
        <Billboard />
      </div>
    </Layout>
  );
};

export default Browse;
