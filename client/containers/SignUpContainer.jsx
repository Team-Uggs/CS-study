import React from 'react';
import { Link } from "react-router-dom";
// class to render our main app
function SignUpContainer (props) {
  return (
    <div class="outerBox">
      <h1>CS Study</h1>
      <div class="loginsignup">
        Create an account
        <form method='POST' action='/signup'>
          <input name="username" type="text" placeholder="username"></input>
          <input name="password" type="password"></input>
          <input type='submit' value='Create User'></input>
        </form>
        <Link to='/'>Log In</Link>
      </div>
    </div>
  )
}

export default SignUpContainer;