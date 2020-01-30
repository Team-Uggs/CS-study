import React from 'react';
import NewUnitModal from '../components/NewUnitModal.jsx';

function NewUnitContainer (props) {
  return (
    <section>
      <NewUnitModal
        addUnit={ props.addUnit }
      />
    </section>
  )
}

export default NewUnitContainer;