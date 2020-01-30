const express = require('express');


const userRouter = express.Router();
const userControllers = require('../controllers/userControllers.js');


// ****** below for signup / login *******
// when user sign up, go to createUser controller to create account
// createUser will check if username already exist in database
// if YES, account WILL NOT be created, res.locals.create = {userCreated: false}
// if no, account created using bcrypt to hash password, res.locals.create = {userCreated: true}

userRouter.post(
  '/signup',
  userControllers.createUser,
  (req, res) => {
    console.log('inside signup post anonymous');

    // what should happen here on successful sign up?
    return res.status(200).json(res.locals.create);
  },
);

// when user log in, go to verifyUser controller to verify account
// verifyUser will check if username exist in database
// if NO, password WILL NOT be check, res.locals.login = {usernameVerified: false}

// if YES, password check with bcrypt compare,

// correct password --> res.locals.login =
// {userId: id, usernameVerified: true, passwordVerified: true}
// incorrect password --> res.locals.login =
// {userId: id, usernameVerified: true, passwordVerified: false}

userRouter.post('/login',
  userControllers.verifyUser,
  (req, res) => {
    console.log('inside login post anonymous');
    // what should happen here on successful log in?
    // return res.status(200).json(res.locals.login);
    // res.cookie('access_token', 'logged-in',
    //   {
    //     expires: new Date(Date.now() + 50000),
    //     httpOnly: true,
    //   });

    // check if the username or password is missing
    const { userNameVerified, passwordVerified } = res.locals.login;
    if (userNameVerified && passwordVerified) {
      console.log('about to redirect');
      return res.status(200).redirect('/main-container');
      // .json({ loginstatus: 'success' });
    }
    // res.status(401).redirect('/');
    return res.status(401).json({ loginstatus: 'fail' });
  });

userRouter.delete('/logout',
  userControllers.logoutUser,
  // destroy cookies
  // send redirect to login page
);


module.exports = userRouter;
