import React, { Component } from 'react';
import { render } from 'react-dom';

import './style/index.css';

// import OOP from './components/OOP.jsx';
// import DATASTRUCTURES from './components/DATASTRUCTURES.jsx';
// import GIT from './components/GIT.jsx';
// import ALGORITHMS from './components/ALGORITHMS.jsx';
import NavBar from './components/NavBar.jsx';
import UnitContainer from './containers/UnitContainer.jsx';

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
    }

    this.updateCurrentUnit = this.updateCurrentUnit.bind(this);
    this.updateDrilledState = this.updateDrilledState.bind(this)
  }

  updateCurrentUnit(event) {
    // Updates the state with the current selection of units. Slices off the dynamically
    // generated ID from the NavBar component at the last index of the string. This ID
    // will be used to render the info comps below our nav based on selection -mp
    const currentUnitId = Number(event.target.id.slice(event.target.id.length - 1)) - 1;
    const currentUnitData = this.state.units[currentUnitId];

    

    this.setState({
      currentUnitIndex: currentUnitId,
      currentUnitData: currentUnitData,
    });
  }

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

  // componentDidUpdate() {
  //   if (this.state.currentUnit !== null) {

  //   }
  // }

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
        <NavBar
          units={ this.state.units }
          updateCurrentUnit= { this.updateCurrentUnit }
        />
        { // conditional render precluded on if a NavBar selection was made, default is null.
          // Updates on NavBar selection
          this.state.currentUnitIndex !== null ?
          <UnitContainer
            // this.state.currentUnit is a string, needs hard set to Number
            // for the currentUnit index
            currentUnitData={ this.state.currentUnitData }
            updateDrilledState={ this.updateDrilledState }
            currentFlashCards={ this.state.currentFlashCards }
            currentResources={ this.state.currentResources }
          />
          : <div></div>
        }
      </section>
    )
  }
}

render(<App />, document.getElementById('app'));