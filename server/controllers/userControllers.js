
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;
const db = require('../db_models/studyModels.js');

const userControllers = {};


/**
* createUser - create and save a new User into the database.
*/
// input username and password is stored in req.body
// createUser will check if username already exist in database
// if YES, account WILL NOT be created, res.locals.create = {userCreated: false}
// if no, account created using bcrypt to hash password, res.locals.create = {userCreated: true}
userControllers.createUser = (req, res, next) => {
  const { username, password } = req.body;

  // query string to check if username exist in database
  const findUser = `SELECT * FROM "userlogin" WHERE username='${username}'`;

  db.query(findUser)
    .then((response) => {
    // if there IS match username in database, go to next
      if (response.rows.length) {
        res.locals.create = { userCreated: false };
        return next();
      }
      // proceed to create username with hash password, if no such user exist in database
      bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
        console.log('Password and hash: ', password, hash);
        const insertUser = `INSERT INTO "userlogin" (username, password) VALUES ('${username}', '${hash}')`;

        db.query(insertUser)
          .then((response) => {
            res.locals.create = { userCreated: true };
            return next();
          });
      });
    });
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/

// verifyUser will check if username exist in database
// if NO, password WILL NOT be check, res.locals.login = {usernameVerified: false}
// if YES, password check with bcrypt compare,
// correct password --> res.locals.login =
// {userId: id, usernameVerified: true, passwordVerified: true}
// incorrect password --> res.locals.login =
// {userId: id, usernameVerified: true, passwordVerified: false}
userControllers.verifyUser = (req, res, next) => {
  // write code here
  const { username, password } = req.body;
  console.log('username: ', username);
  console.log('password: ', password);

  const findUser = `SELECT * FROM "userlogin" WHERE username='${username}'`;

  db.query(findUser)
    .then((response) => {
      // if no match username in database: do the following
      if (!response.rows.length) {
        res.locals.login = { usernameVerified: false };
        return next();
      }

      // else if username exist: do the following
      console.log(response.rows);
      bcrypt.compare(password, response.rows[0].password, (err, result) => {
        // result will be true if it's a match, false otherwise;
        if (result) {
          res.cookie('username', username);
        }
        console.log(result);
        res.locals.login = {
          userId: response.rows[0].id,
          userNameVerified: true,
          passwordVerified: result,
        };
        return next();
      });
    });
};

userControllers.logoutUser = (req, res, next) => {

};

module.exports = userControllers;
