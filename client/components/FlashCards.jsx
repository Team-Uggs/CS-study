import React from 'react'

function FlashCard (props) {
  return (
    <div>
      {
        props.questionAnswered ?
        <div className="flashCard_question" onClick={ () => props.flipFlashCard(props.arrayId) }>
          <a id='questionP'>{ props.question }</a>
          <button onClick={ props.deleteFlashCard } value={ props.id } className="deleteCard" type="button">x</button>
        </div> :
        <div className="flashCard_question" onClick={ () => props.flipFlashCard(props.arrayId) }>
          <a id='questionP'>{ props.answer }</a>
          <button onClick={ props.deleteFlashCard } value={ props.id } className="deleteCard" type="button">x</button>
        </div>
      }
    </div>
  );
}

export default FlashCard;