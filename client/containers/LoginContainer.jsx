import React from 'react';
import { Link } from 'react-router-dom';
// class to render our main app
function LoginContainer(props) {
  // const { updateCurrentUser } = props;

  return (
    <div className="outerBox">
      <h1>CS Study</h1>
      <div className="loginsignup">
        <h2>Login</h2>
        <form method="POST" action="user/login">
          <label htmlFor="username">username</label>
          <input id="username" name="username" type="text" placeholder="username" />
          <label htmlFor="password">password</label>
          <input id="password" name="password" type="text" placeholder="password" />
          <button
            type="submit"
            value="login"
            // onClick={(e) => {
            //   e.preventDefault();
            //   console.log(e.target.value);

            //   fetch('user/login', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //       // 'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            //     body: JSON.stringify({
            //       username: document.getElementById('username').value,
            //       password: document.getElementById('password').value,
            //     }),
            //   })
            //     .then((response) => {
            //       console.log('res status: ', response.status);
            //       if (response.status === 200) {
            //         // this.props.history.push('/main-container');
            //         console.log('go to main container!');
            //         // updateCurrentUser();
            //         fetch('/main-container')
            //           .then((res) => console.log('feched'));
            //       }
            //       if (response.status === 401) alert('Incorrect username or password');
            //     })
            //     .catch((err) => console.log('catch: ', err));
            // }}
          >
            Login
          </button>
        </form>
        <Link to="/sign-up">Sign up</Link>
      </div>
    </div>
  );
}

export default LoginContainer;
