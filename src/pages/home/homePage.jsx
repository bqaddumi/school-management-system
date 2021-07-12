import { useSelector } from "react-redux";
import Loader from "../../components/common/loader/loader";
import classes from "./homePage.module.css";

const HomePage = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);

  return (
    <>
      {isLoading && (
        <div className={classes.loaderContainer}>
          <Loader type="loader" />
        </div>
      )}
      <section className={classes.banner}></section>
    </>
  );
};

export default HomePage;
