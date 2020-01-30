import React from 'react';

function Description (props) {
  return (
    <div className="innerbox">
      <article>
        <p>{props.description}</p>
      </article>
      <h4>Sub Topics</h4>
      <p>{props.sub_units}</p>
      {/* checklist is stretch */ }
    </div>
  )
}

export default Description;