import React from "react";
import "./SigninSignup.css";
function CommonSigninSignup() {
  
    return (
      <div>
        <div class="commoninput">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="username@gmail.com"
            name="username"
          />
        </div>
        <div class="commoninput">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            name="password"
          />
        </div>
      </div>
    );
  
}

export default CommonSigninSignup;
