import React from 'react';
import { Link } from "react-router-dom";
// class to render our main app
function NavBar (props) {
  const unitsArr = props.units;
  /*
   * Modularize adding the units
   */
  const unitsLinks = [];
  // Array now reverses so the navBar displays in learning order instead of backwards.
  // However... prior group set the DB ID's for units out of order as well. Will look
  // into changing if possible.
  for (let i = unitsArr.length - 1; i >= 0 ; i -= 1) {
    unitsLinks.push(<li key={ `nav-bar list item ${ unitsArr[i].id }` }><Link to="/main-container/units" id={`nav-bar-id${ unitsArr[i].id }`} onClick={ (e) => props.updateCurrentUnit(e) }>{ unitsArr[i].unit }</Link></li>)
  }

  return (
    <div>
      <h1 id='appTitle'>CS Study Planner</h1>
      <nav id='navBar'>
      <ul id='navbarList'>
        { unitsLinks }
      </ul>
      </nav>
    </div>
  )
}

export default NavBar;