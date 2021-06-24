import React, { useContext } from "react";
import CommonSigninSignup from "../../commonComponent/SigninSignup.jsx";
import { CommonDataContext } from "../../commonComponent/SigninSignup.jsx";
import "./signinPageForm.css";

const SigninForm = () => {
  const data = useContext(CommonDataContext);
  const hh=()=>{
    document.getElementById("hideDiv").style.visibility ="visible";
}
hh();
  return (
    <div className="SigninForm" id="hideDiv">
      <CommonSigninSignup />
    </div>
  );
};

export default SigninForm;
