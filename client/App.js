import React, { Component } from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './style/index.css';

import MainContainer from './containers/MainContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import SignUpContainer from './containers/SignUpContainer.jsx';
import LoginStatus from './components/LoginStatus.jsx';

// creating a router component here that will be rendered to
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      units: [],
      postDidMount: false,
      currentUnitData: null,
      currentUnitIndex: null,
      currentFlashCards: null,
      currentResources: null,
      question: true,
      questionsArray: [true],
    };

    this.updateCurrentUnit = this.updateCurrentUnit.bind(this);
    this.updateDrilledState = this.updateDrilledState.bind(this);
    this.addFlashCard = this.addFlashCard.bind(this);
    this.deleteFlashCard = this.deleteFlashCard.bind(this);
    this.flipFlashCard = this.flipFlashCard.bind(this);
    this.flashCardQuestionAnswers = this.flashCardQuestionAnswers.bind(this);
    this.addUnit = this.addUnit.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
  }

  // Nav Bar functionality
  updateCurrentUnit(event) {
    // Updates the state with the current selection of units. Slices off the dynamically
    // generated ID from the NavBar component at the last index of the string. This ID
    // will be used to render the info comps below our nav based on selection -mp
    let currentUnitId = event.target.id.split(' ');

    currentUnitId = Number(currentUnitId[currentUnitId.length - 1]);

    const currentUnitData = this.state.units[currentUnitId];

    this.setState({
      currentUnitIndex: currentUnitId,
      currentUnitData,
      // clears the questions array after a re-selection on the navbar
      questionsArray: [],
    });
  }

  // Flashcard Functionality -- Add / Delete / Flip
  addFlashCard() {
    // Function to add a new flashCard to our database
    const addFlashCardURL = `/units/${this.state.currentUnitData.id.toString()}`;

    fetch(addFlashCardURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: document.getElementById('question').value,
        answer: document.getElementById('answer').value,
      }),
    }).then((response) => response.json())
      .then((flashCardResponse) => {
        const { flashCards, resources } = flashCardResponse;
        console.log('currentFlashCards', flashCards);
        const questionAnswerArray = this.flashCardQuestionAnswers(flashCards.length);

        this.setState({
          currentFlashCards: flashCards,
          currentResources: resources,
          questionsArray: questionAnswerArray,
        });
      })
      .catch((err) => console.log('err:', err));
  }

  deleteFlashCard(e) {
    // / Function to delete a flashCard in our database
    const deleteFlashCardURL = `/units/${this.state.currentUnitData.id.toString()}`;

    fetch(deleteFlashCardURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: e.target.value,
      }),
    }).then((response) => response.json())
      .then((flashCardResponse) => {
        const { flashCards, resources } = flashCardResponse;
        const questionAnswerArray = this.flashCardQuestionAnswers(flashCards.length);

        this.setState({
          currentFlashCards: flashCards,
          currentResources: resources,
          questionsArray: questionAnswerArray,
        });
      })
      .catch((err) => console.log('err:', err));
  }

  // keeps a running array of true/false for the card flipping. Updates in state.
  flashCardQuestionAnswers(cardLength) {
    const currFlashCardQuestionArray = this.state.currentFlashCards;
    const buildQuestionsArray = this.state.questionsArray;

    // if the current array is empty, populate with true based on the fetched length of
    // the the flashCards.
    if (!currFlashCardQuestionArray) {
      for (let i = 0; i < cardLength; i += 1) {
        buildQuestionsArray.push(true);
      }
      return buildQuestionsArray;
      // if the questions array is empty, just populate with a new length index of true
    } if (buildQuestionsArray.length === 0) {
      for (let i = 0; i < cardLength; i += 1) {
        buildQuestionsArray.push(true);
      }
      return buildQuestionsArray;
      // if a card is added, this will push an additional true to the array
    } if (currFlashCardQuestionArray.length < cardLength) {
      for (let i = currFlashCardQuestionArray.length; i < cardLength; i += 1) {
        buildQuestionsArray.push(true);
      }
      return buildQuestionsArray;
      // if a card is deleted, just populate and re-render with the new fetched length
      // of cards
    } if (currFlashCardQuestionArray.length > cardLength) {
      const tempArray = [];
      for (let i = 0; i < cardLength; i += 1) {
        buildQuestionsArray.push(true);
      }
      return tempArray;
    }
    return buildQuestionsArray;
  }

  // function to flip the flashcards value on click should change state false
  flipFlashCard(arrayId) {
    const currentAnswersStateArray = this.state.questionsArray;

    if (currentAnswersStateArray[arrayId]) currentAnswersStateArray[arrayId] = false;
    else currentAnswersStateArray[arrayId] = true;

    this.setState({ questionsArray: currentAnswersStateArray });
  }

  // functions to add and delete a unit
  addUnit() {
    // Function to add a new flashCard to our database
    const addUnitURL = '/units/add-unit';
    const unitName = document.getElementById('unit-name');
    const unitDescription = document.getElementById('unit-description');
    const subUnits = document.getElementById('sub-units');

    fetch(addUnitURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        unit: unitName.value,
        description: unitDescription.value,
        sub_units: subUnits.value,
      }),
    }).then((response) => response.json())
      .then((newUnitResponse) => {
        console.log('new unit response', newUnitResponse);

        unitName.value = '';
        unitDescription.value = '';
        subUnits.value = '';

        this.setState({
          units: newUnitResponse,
          postDidMount: true,
        });
      })
      .catch((err) => console.log('error in New Unit Response:', err));
  }

  deleteUnit(cardId) {
    // / Function to delete a flashCard in our database
    const deleteUnitURL = '/units/delete-unit';

    fetch(deleteUnitURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: cardId,
      }),
    }).then((response) => response.json())
      .then((deleteUnitResponse) => {
        console.log('delete unit response', deleteUnitResponse);
        // Sets a redirect current unit after delete
        const redirectUnit = this.state.units[deleteUnitResponse.length - 1];

        this.setState({
          units: deleteUnitResponse,
          currentUnitData: redirectUnit,
          postDidMount: true,
        });
      })
      .catch((err) => console.log('error in deleteUnit:', err));
  }

  // passed to lower components to update state in App.js
  updateDrilledState(updateObject) {
    this.setState(updateObject);
  }

  componentDidMount() {
    // fetching state after component mounts
    const unitsURL = '/units';
    fetch(unitsURL)
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          units: data,
          postDidMount: true,
        });
      })
      .catch((err) => console.log('ERROR:', err));
  }

  render() {
    if (!this.state.postDidMount) {
      return (<h1>We LOADING BABY!</h1>);
    }

    /**
     * Need to find a better way of modularizing each of the renders
     * Each of the specific pages are the same
     * Breaking the DRY principle
     * Would need to make a Page component that would be a route path
     */

    return (
      <section className="app-container">
        <Router>
          <Switch>
            <Route path="/main-container">
              <LoginStatus />
              <MainContainer
                // Navbar Props
                units={this.state.units}
                updateCurrentUnit={this.updateCurrentUnit}
                // Unit Container Props
                currentUnitIndex={this.state.currentUnitIndex}
                currentUnitData={this.state.currentUnitData}
                updateDrilledState={this.updateDrilledState}
                currentFlashCards={this.state.currentFlashCards}
                currentResources={this.state.currentResources}
                addFlashCard={this.addFlashCard}
                deleteFlashCard={this.deleteFlashCard}
                flipFlashCard={this.flipFlashCard}
                flashCardQuestionAnswers={this.flashCardQuestionAnswers}
                questionsArray={this.state.questionsArray}
                // Add Unit Props
                addUnit={this.addUnit}
                deleteUnit={this.deleteUnit}
              />
            </Route>
            <Route path="/sign-up">
              <SignUpContainer />
            </Route>
            <Route path="/">
              <LoginContainer />
            </Route>
          </Switch>
        </Router>
      </section>
    );
  }
}

render(<App />, document.getElementById('app'));
