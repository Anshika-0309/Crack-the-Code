import "./login.css"
import { Link } from "react-router-dom";
import {Context} from "../../context/Context";
import axios from "axios";
import {useRef, useContext} from "react";

export default function Login() {
const userRef = useRef();
const passwordRef = useRef();
const { dispatch, isFetching} = useContext(Context)


const handleSubmit = async (e)=>{
  e.preventDefault();
  dispatch({type:"LOGIN_START"});
  try{
   const res = await axios.post("/auth/login", {
    username : userRef.current.value,
    password: passwordRef.current.value,
   })
   dispatch({type:"LOGIN_SUCCESS",payload: res.data});
  }catch(err)
  {
   dispatch({type: "LOGIN_FAILURE"});
  }
};

  return (
    <div className="login">
        <span className="loginTitle">LOGIN</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label >Username</label>
        <input type="text" className="loginInput" placeholder="Enter your Username" ref={userRef}></input>
        <label >Password</label>
        <input type="password" className="loginInput" placeholder="Enter your password" ref={passwordRef}></input>
        <button className="loginSubmit" type="submit" disabled={isFetching}>Login</button>
      </form>
      <button className="RegisterButton">
        <Link className="link" to="/register">REGISTER</Link>
      </button>
    </div>
  )
}
