const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRouter');
const unitsRouter = require('./routes/unitsRouter');

const app = express();
const PORT = 3000;
const graphQLHTTP = require('express-graphql');
const unitControllers = require('./controllers/unitControllers.js');
const flashcardControllers = require('./controllers/flashcardControllers.js');

const schema = require('./graphql/graphql.js');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use(
  (req, res, next) => {
    console.log(
      `******* FLOW TEST *******
      METHOD: ${req.method},
      URL: ${req.url},
      ORIGINAL URL: ${req.originalUrl},
      BODY: ${JSON.stringify(req.body, null, 2)}\n)`,
    );
    if (req.cookies) console.log('our cookies: ', req.cookies);
    // invoke next piece of middleware
    return next();
  },
);

app.use('/user', userRouter);

app.use('/units', unitsRouter);

app.use('/graphql',
  graphQLHTTP({
    schema,
    graphiql: true,
  }));

// sends a GET request to retreive the bundle.js
app.use('/build',
  (req, res) => res.sendFile(path.resolve(__dirname, '../build/bundle.js')));


app.use('/',
  (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));


// catch-all route handler for any requests to an unknown route
app.use('*',
  (req, res) => res.sendStatus(404));
// asterisk '*' means 'wildcard' and matches any route to catch everything

// global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!res.headersSent) {
    res.status(500);
    res.render('error', { error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
