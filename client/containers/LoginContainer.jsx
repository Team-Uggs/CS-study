import React from 'react';
import { Link } from "react-router-dom";
// class to render our main app
function LoginContainer (props) {
  return (
    <div class="outerBox">
      <h1>CS Study</h1>
      <div class="loginsignup">
        Login
        <form method="POST" action='/login'>
          <input name="username" type="text" placeholder="username"></input>
          <input name="password" type="password" placeholder="password"></input>
          <input type='submit' value="login"></input>
        </form>
        <Link className='submission' to='/sign-up'>Sign up</Link>
      </div>
    </div>
  )
}

export default LoginContainer;