import React from 'react';
import { Link } from 'react-router-dom';
// class to render our main app
function SignUpContainer(props) {
  return (
    <div className="outerBox">
      <h1>CS Study</h1>
      <div className="loginsignup">
        Create an account
        <form method="POST" action="/user/signup">
          <input name="username" type="text" placeholder="username" />
          <input name="password" type="password" />
          <input type="submit" value="Create User" />
        </form>
        <Link to="/">Log In</Link>
      </div>
    </div>
  );
}

export default SignUpContainer;
