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
        const questionAnswerArray = this.props.flashCardQuestionAnswers(data.flashCards.length)
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
              </div> :
              <div></div> }
        </div>
      </div>
    );
  }
}

export default UnitContainer;