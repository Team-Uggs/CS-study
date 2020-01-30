const express = require('express');

const unitsRouter = express.Router();

const flashcardControllers = require('../controllers/flashcardControllers');
const unitControllers = require('../controllers/unitControllers');
const resourceControllers = require('../controllers/resourceControllers');


// handles incoming request to /units endpoint
unitsRouter.get('/',
  unitControllers.getUnits,
  (req, res) => {
    res.status(200).json(res.locals.units);
  });

  unitsRouter.post('/add-unit',
  unitControllers.addUnits,
  unitControllers.getUnits,
  (req, res) => {
    res.status(200).json(res.locals.units);
  });

  unitsRouter.patch('/', 
  unitControllers.updateUnits,
  (req, res) => {
    res.status(200).json(res.locals.units)
  });

  unitsRouter.delete('/delete-unit/:id',
  unitControllers.deleteUnits,
  unitControllers.getUnits,
  (req, res) => {
    res.status(200).json(res.locals.units);
  });

  unitsRouter.get('/quiz',
  unitControllers.getQuestions,
  (req, res) => {  
    res.status(200).json(res.locals.units);
  });



// initial load of unit
unitsRouter.get('/:unitId',
  resourceControllers.getResources,
  flashcardControllers.getFlashcards,
  (req, res) => {
    res.status(200).json({
      flashCards: res.locals.flashcards,
      resources: res.locals.resources,
    });
  });

// Adding a flash card
// return all flashcards and resources
unitsRouter.post('/:unitId',
  flashcardControllers.addFlashcards,
  resourceControllers.getResources,
  flashcardControllers.getFlashcards,
  (req, res) => {
    res.status(200).json({
      flashCards: res.locals.flashcards,
      resources: res.locals.resources,
    });
  });

// Deleting a flash card
// return all flashcards and resources
unitsRouter.delete('/:unitId',
  flashcardControllers.deleteFlashcards,
  resourceControllers.getResources,
  flashcardControllers.getFlashcards,
  (req, res) => {
    res.status(200).json({
      flashCards: res.locals.flashcards,
      resources: res.locals.resources,
    });
  });

  

module.exports = unitsRouter;
