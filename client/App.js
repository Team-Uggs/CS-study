import React, { Component } from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './style/index.css';

import MainContainer from './containers/MainContainer.jsx';
import LoginContainer from './containers/LoginContainer.jsx';
import SignUpContainer from './containers/SignUpContainer.jsx';

// creating a router component here that will be rendered to
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      units: [],
      postDidMount: false,
      currentUnitData: null,
      currentUnitIndex: null,
      currentFlashCards: null,
      currentResources: null,
      question: true,
      questionsArray: [],
    }

    this.updateCurrentUnit = this.updateCurrentUnit.bind(this);
    this.updateDrilledState = this.updateDrilledState.bind(this);
    this.addFlashCard = this.addFlashCard.bind(this);
    this.deleteFlashCard = this.deleteFlashCard.bind(this);
    this.flipFlashCard = this.flipFlashCard.bind(this);
    this.flashCardQuestionAnswers = this.flashCardQuestionAnswers.bind(this);
  }

  // Nav Bar functionality
  updateCurrentUnit(event) {
    // Updates the state with the current selection of units. Slices off the dynamically
    // generated ID from the NavBar component at the last index of the string. This ID
    // will be used to render the info comps below our nav based on selection -mp
    const currentUnitId = Number(event.target.id.slice(event.target.id.length - 1)) - 1;
    const currentUnitData = this.state.units[currentUnitId];

    this.setState({
      currentUnitIndex: currentUnitId,
      currentUnitData: currentUnitData,
      // clears the questions array after a re-selection on the navbar
      questionsArray: [],
    });
  }

  // Flashcard Functionality -- Add / Delete / Flip
  addFlashCard() {
    // Function to add a new flashCard to our database
    const addFlashCardURL = `/units/${ this.state.currentUnitData.id.toString() }`

    fetch(addFlashCardURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: document.getElementById('question').value,
        answer: document.getElementById('answer').value,
      }),
    }).then(response => response.json())
      .then((flashCardResponse) => {
        const { flashCards, resources } = flashCardResponse;
        console.log('currentFlashCards', flashCards )
        const questionAnswerArray = this.flashCardQuestionAnswers(flashCards.length);

        this.setState({
          currentFlashCards: flashCards,
          currentResources: resources,
          questionsArray: questionAnswerArray,
        })
      })
      .catch(err => console.log('err:', err));
  }

  deleteFlashCard(e) {
    /// Function to delete a flashCard in our database
    const deleteFlashCardURL = `/units/${ this.state.currentUnitData.id.toString() }`

    fetch(deleteFlashCardURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: e.target.value,
      }),
      }).then(response => response.json())
      .then((flashCardResponse) => {
        const { flashCards, resources } = flashCardResponse;
        const questionAnswerArray = this.flashCardQuestionAnswers(flashCards.length);

        this.setState({
          currentFlashCards: flashCards,
          currentResources: resources,
          questionsArray: questionAnswerArray,
        })
      })
        .catch(err => console.log('err:', err));
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
    } else if (buildQuestionsArray.length === 0) {
        for (let i = 0; i < cardLength; i += 1) {
          buildQuestionsArray.push(true);
        }
        return buildQuestionsArray;
      // if a card is added, this will push an additional true to the array
    } else if (currFlashCardQuestionArray.length < cardLength) {
        for (let i = currFlashCardQuestionArray.length; i < cardLength; i += 1) {
          buildQuestionsArray.push(true);
        }
        return buildQuestionsArray;
      // if a card is deleted, just populate and re-render with the new fetched length
      // of cards
    } else if (currFlashCardQuestionArray.length > cardLength) {
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

  // functions to add a unit
  addUnit() {
    // Function to add a new flashCard to our database
    const addUnitURL = `/units/${ this.state.currentUnitData.id.toString() }`

    fetch(addUnitURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        unit: document.getElementById('unit-name').value,
        description: document.getElementById('unit-description').value,
        sub_units: document.getElementById('sub-units').value,
      }),
    }).then(response => response.json())
      .then((newUnitResponse) => {
        this.setState({
          units: newUnitResponse,
        })
      })
      .catch(err => console.log('error in New Unit Response:', err));
  }
  // passed to lower components to update state in App.js
  updateDrilledState(updateObject){
    this.setState(updateObject);
  }

  componentDidMount() {
    // fetching state after component mounts
    const unitsURL = '/units'
    fetch(unitsURL)
      .then(data => data.json())
      .then(data => {
        this.setState({
          units: data,
          postDidMount: true,
        })
      })
      .catch(err => console.log('ERROR:', err));
  }

  render() {

    if (!this.state.postDidMount) {
      return ( <h1>We LOADING BABY!</h1> )
    }

    /**
     * Need to find a better way of modularizing each of the renders
     * Each of the specific pages are the same
     * Breaking the DRY principle
     * Would need to make a Page component that would be a route path
     */

    return (
      <section className='app-container'>
        <Router>
          <Switch>
            <Route path="/main-container">
              <MainContainer
                // Navbar Props
                units={ this.state.units }
                updateCurrentUnit= { this.updateCurrentUnit }
                // Unit Container Props
                currentUnitIndex={ this.state.currentUnitIndex }
                currentUnitData={ this.state.currentUnitData }
                updateDrilledState={ this.updateDrilledState }
                currentFlashCards={ this.state.currentFlashCards }
                currentResources={ this.state.currentResources }
                addFlashCard={ this.addFlashCard }
                deleteFlashCard={ this.deleteFlashCard }
                flipFlashCard={ this.flipFlashCard }
                flashCardQuestionAnswers={ this.flashCardQuestionAnswers }
                questionsArray={ this.state.questionsArray }
                // Add Unit Props
                addUnit={ this.addUnit }
              />
            </Route>
            <Route path='/sign-up'>
              <SignUpContainer />
            </Route>
            <Route path='/'>
              <LoginContainer />
            </Route>
          </Switch>
        </Router>
      </section>
    )
  }
}

render(<App />, document.getElementById('app'));