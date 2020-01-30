const db = require('../db_models/studyModels.js');

const unitControllers = {};

unitControllers.getUnits = (req, res, next) => {
  const queryString = 'SELECT * FROM units;';
  db.query(queryString)
    .then((response) => {
      // console.log('response is:', response.rows);
      res.locals.units = response.rows;
      return next();
    });
};

unitControllers.addUnits = (req, res, next) => {
  const { unit, description, sub_units } = req.body;
  const dataArr = [unit, description, sub_units];
  const queryString = `INSERT INTO units (unit, description, sub_units) VALUES ($1, $2, $3);`;
  db.query(queryString, dataArr)
    .then(() => next())  
    .catch((error) => {
      console.log('this is an error', error);
    });
};

unitControllers.updateUnits = (req, res, next) => {
  const { id } = req.body;
  const { unit, description, sub_units } = req.body;
  const dataArr = [unit, description, sub_units, id];
  const queryString = 'UPDATE units SET unit=($1), description=($2), sub_units=($3) WHERE id=($4)'
  db.query(queryString, dataArr)
  .then(() => next())
  .catch((error) => {
    console.log('this is an error', error);
  });
}; 


unitControllers.deleteUnits = (req, res, next) => {
  const { id } = req.body;
  const queryString = `DELETE FROM units where id = ${id};`;
  db.query(queryString)
    .then(() => next())
    .catch((error) => {
      console.log('this is an error', error);
    });
};


unitControllers.getQuestions = (req, res, next) => {
  const queryString = 'SELECT units.unit, flashcards.question, flashcards.answer FROM flashcards JOIN units on flashcards.unit_id = units.id;';
  db.query(queryString)
    .then((response) => {
      const arrOfQuestions = response.rows;
      let randomNums = [];
      const randomNumsLength = 5;
      while(randomNums.length < randomNumsLength) {
        let x = (arrOfQuestions[Math.floor(Math.random() * arrOfQuestions.length)]);
        if(!randomNums.includes(x)){
          randomNums.push(x);
          // console.log(randomNums)
    }
}

      // console.log('response is:', response.rows.length);
      res.locals.units = randomNums;
      return next();
    })
    .catch((error) => {
      console.log('error', error)
    })
    

};






module.exports = unitControllers;
