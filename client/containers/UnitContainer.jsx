import React from 'react';
import FlashCardsContainer from './FlashCardsContainer.jsx';
import Description from '../components/Description.jsx';
import Resources from '../components/Resources.jsx';

class UnitContainer extends React.Component {

  updateCurrentFlashCardsAndResources() {
    const unitId = this.props.currentUnitData.id.toString();
    const flashCardsURL = `/units/${unitId}`;

    fetch(flashCardsURL)
      .then((response) => response.json())
      .then((data) => {
        // console.log('flashCard Data', data.flashCards.length)
        let questionAnswerArray = [];
        // if it's a new card (with no questions) we will push a true to questionsArray,
        // as its required for conditional rendering
        if (data.flashCards.length <= 0) questionAnswerArray.push(true);
        // if it's an existing card with questions, we will populate the array based on
        // length of questions array
        else questionAnswerArray = this.props.flashCardQuestionAnswers(data.flashCards.length)

        this.props.updateDrilledState({
            questionsArray: questionAnswerArray,
            currentFlashCards: data.flashCards,
            currentResources: data.resources,
          })
      }).catch((error) => console.log('ERROR GET FLASHCARDS: ', error));
  }

  componentDidMount() {
    this.updateCurrentFlashCardsAndResources();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.currentFlashCards === this.props.currentFlashCards) {
      this.updateCurrentFlashCardsAndResources();
    }
  }

  render() {
    /***
     * conditonally render to get state
     * a bit slow need to come back and refactor/fix
     */

    return (
      <div className="container">
        <h1>{ this.props.currentUnitData.unit }</h1>
        <div className="outerBox">
            { this.props.questionsArray.length > 0 ?
              <div>
                <Description
                  description={ this.props.currentUnitData.description }
                  sub_units={ this.props.currentUnitData.sub_units } />
                <FlashCardsContainer
                  flashCards={ this.props.currentFlashCards }
                  id={ this.props.currentUnitData.id.toString() }
                  addFlashCard={ this.props.addFlashCard }
                  flipFlashCard={ this.props.flipFlashCard }
                  deleteFlashCard={ this.props.deleteFlashCard }
                  questionsArray={ this.props.questionsArray }
                  />
                <Resources
                  resources={ this.props.currentResources } />
                <button onClick={() => this.props.deleteUnit(this.props.currentUnitData.id.toString())} className="deleteUnit submission" type="button">Delete Unit</button>
              </div>
              :
            <div></div> }
        </div>
      </div>
    );
  }
}

export default UnitContainer;