import React, { Component } from 'react';
import FlashCards from '../components/FlashCards.jsx'


class FlashCardsContainer extends Component {
  render() {
    const flashCardsArr = [];

    console.log('flash cards', this.props.flashCards)

    for (let i = 0; i < this.props.flashCards.length; i+= 1) {
      const { id, unit_id, question, answer} = this.props.flashCards[i];

      flashCardsArr.push(
        <FlashCards
          id={ id }
          arrayId={ i }
          key={ `flash-card-container${ i }` }
          question={ question }
          answer={ answer }
          unit_id={ unit_id }
          deleteFlashCard={ this.props.deleteFlashCard }
          flipFlashCard={ this.props.flipFlashCard }
          questionAnswered={ this.props.questionsArray[i] }
        />)
    }

    return (
      <div className="innerbox">
        <h4>Flashcards</h4>

        <div className="flashCardList">
          { flashCardsArr }
        </div>
        <input type="text" placeholder="question" id="question" ></input>
        <input type="text" placeholder="answer" id="answer"></input>
        <button id='add' onClick={() => this.props.addFlashCard()}>Add Card</button>
      </div>
    );
  }
}

export default FlashCardsContainer;
