import React, { Fragment,useRef, useState } from 'react'
import "./LoginSignUp.css";
import Loader from '../layout/Loader/loader';
import MailOutlineIcon from "@mui/icons-material";
import LockOpenIcon from "@mui/icons-material/LockOpenIcon";

import {Link} from "react-router-dom"
const LoginSignUp = () => {
  const loginTab =useRef(null);
  const switcherTab =useRef(null);
  const registerTab =useRef(null);

const switchTab = (e,tab)=>{
if(tab==="login"){
  switcherTab.current.classList.add("shiftToNeutral");
  switcherTab.current.classList.remove("shiftToRigth");
  registerTab.current.classList.remove("shiftToNeutralForm");
  loginTab.current.classList.remove("shiftToLeft");


}
if(tab=="register"){
  switcherTab.current.classList.add("shiftToRigth");
  switcherTab.current.classList.remove("shiftToNeutral");
  registerTab.current.classList.remove("shiftToNeutralForm");
  loginTab.current.classList.remove("shiftToLeft");
}

}

const loginSubmit =()=>{
console.log("form submitted")
}

const[loginEmail,setLoginEmail]=useState("");
const[loginPassword,setLoginPassword]=useState("")
  return (
   <Fragment>
    <div className='loginSignUpContainer'>
      <div className='loginSignUpBox'>
        <div>
          <div className='login-signup-toggle'>
            <p onClick={(e) =>switchTab(e,"login")}>Login</p>
            <p onClick={(e)=> switchTab(e,"register")}>Register</p>

          </div>
          <button ref={switcherTab}></button>
        </div>
<form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
<div className='="loginEmail'>
  <MailOutlineIcon/>
<input
  type="email"
  required
  placeholder='Email'
  onChange={(e)=>setLoginEmail(e.target.value)}
  />  

</div>
<div className='loginPassword'>
  <LockOpenIcon />
  <input
  type="password"
  required
  placeholder='Email'
  onChange={(e)=>setLoginEmail(e.target.value)}
  />
</div>
<Link to="/password/frogot">Forgot password ?</Link>
<input type="submit" value="login" className='loginBtn'/>
</form>
      </div>

    </div>
   </Fragment>
  )
}

export default LoginSignUp
