import React from "react";
import { useSelector } from "react-redux";
import guest from "../../images/guest.jpg";
import BackgroundLogo from "../../components/common/backgroundLogo/backgroundLogo";
import Footer from "../../components/common/footer/footer";
import classes from "./guestPage.module.scss";

const GuestPage = () => {
  const usersObject = useSelector((state) => state.auth.userInformation);
  const userInformation = JSON.parse(usersObject ? usersObject : false);
  const guestName =
    userInformation.userName.charAt(0).toUpperCase() +
    userInformation.userName.slice(1);
  const guestEmail = userInformation.uid;

  return (
    <div>
      <BackgroundLogo title={"Welcome " + guestName +" in WIX school"} major={guestEmail} />
      <div className={classes.sectionContainer}>
        <img
          src={guest}Guest
          alt="Logo  Page"
          className={classes.imageGuest}
        />
      </div>
      <Footer />
    </div>
  );
};

export default GuestPage;
