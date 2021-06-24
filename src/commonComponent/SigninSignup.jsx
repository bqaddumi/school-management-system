import React,{useState} from "react";
import "./SigninSignup.css";
import "../commonComponent/SigninSignup";

let data={
  password: '',
  email:''
};

export const CommonSigninSignup = () => {
  const [password,setPassword]=useState();
  const [email,setEmail]=useState();
 data.password=password;
 data.email=email;
  return (      
    <form >
      <div className="commoninput">
        <label htmlFor="email">Username</label>
        <input
          id="email"
          type="email"
          placeholder="username@gmail.com"
          name="email"
          onChange={(event)=>setEmail(event.target.value)}
        />
      </div>
      <div className="commoninput">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="password"
          name="password"
          onChange={(event)=>setPassword(event.target.value)}
        />
      </div>
    </form>

  );
 
};

export default CommonSigninSignup;

export const CommonDataContext = React.createContext(data);