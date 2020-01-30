/* eslint-disable react/prop-types */
import React from 'react';
import { useCookies } from 'react-cookie';

const LoginStatus = (props) => {
  // const { currentUser } = props;

  const user = useCookies(['username'])[0].username;
  // const [cookies] = useCookies(['username']);
  console.log(user);
  // console.log(useCookies(['username']));
  // const user = useCookies();
  return (
    <div>
    Logged in as:
      {' '}
      <span style={{ color: 'yellow' }}>{ user }</span>
      <button
        type="submit"
        onClick={() => {
          console.log('hello');
          fetch('/user/logout', {
            method: 'DELETE',
          });
        }}
      >
Logout

      </button>
    </div>
  );
};

export default LoginStatus;
