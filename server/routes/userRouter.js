const express = require('express');


const userRouter = express.Router();
const unitControllers = require('../controllers/userControllers.js');


// ****** below for signup / login *******
// when user sign up, go to createUser controller to create account
// createUser will check if username already exist in database
// if YES, account WILL NOT be created, res.locals.create = {userCreated: false}
// if no, account created using bcrypt to hash password, res.locals.create = {userCreated: true}

userRouter.post(
  '/signup',
  unitControllers.createUser,
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
  // unitControllers.verifyUser,
  (req, res) => {
    console.log('inside login post anonymous');
    // what should happen here on successful log in?
    // return res.status(200).json(res.locals.login);
    res.cookie('access_token', 'logged-in',
      {
        expires: new Date(Date.now() + 50000),
        httpOnly: true,
      });

    return res.status(200).json('reached login');
  });


module.exports = userRouter;
