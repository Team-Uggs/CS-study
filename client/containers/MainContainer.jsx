import React from 'react';

import NavBar from '../components/NavBar.jsx';
import UnitContainer from './UnitContainer.jsx';
import NewUnitContainer from './NewUnitContainer.jsx';

import { Switch, Route, Link } from "react-router-dom";

function MainContainer (props) {
  return (
    <div>
      <NavBar
        units={ props.units }
        updateCurrentUnit= { props.updateCurrentUnit } />
      <nav id='navBar'>
        <ul id='navbarList'>
          <Link to='/main-container/create-unit'>Create New Unit</Link>
        </ul>
      </nav>
        <Switch>
          <Route path="/main-container/units">
            { // conditional render precluded on if a NavBar selection was made, default is null.
              // Updates on NavBar selection
              props.currentUnitIndex !== null ?
            <UnitContainer
            // this.state.currentUnit is a string, needs hard set to Number
            // for the currentUnit index
              currentUnitData={ props.currentUnitData }
              updateDrilledState={ props.updateDrilledState }
              currentFlashCards={ props.currentFlashCards }
              currentResources={ props.currentResources }
              addFlashCard={ props.addFlashCard }
              deleteFlashCard={ props.deleteFlashCard }
              flipFlashCard={ props.flipFlashCard }
              flashCardQuestionAnswers={ props.flashCardQuestionAnswers }
              questionsArray={ props.questionsArray }
            />
              : <div></div>
            }
          </Route>
          <Route path='/main-container/create-unit'>
            <NewUnitContainer />
          </Route>
        </Switch>
    </div>
  )
}

export default MainContainer;