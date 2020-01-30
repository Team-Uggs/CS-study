import React from 'react';

function Resources (props) {
  const resourcesArr = [];

  for (let i = 0; i < props.resources.length; i += 1) {
    resourcesArr.push(<li key={`resource-list-item${i}`} id='resourcesList'><a href={props.resources[i].resources}>{props.resources[i].resources}</a></li>)
  }

  return (
    <div className="innerbox">
      <ul>
        {resourcesArr}
      </ul>
    </div>
  )
}

export default Resources;