import React, { Fragment } from 'react'
import Button from '../Button';

function InstrumentList({
  instruments,
  onSelect
}) { 
  return (
    <div className="instrument-list">
      {
        instruments.map((instrument) => (
          <Button 
            key={ instrument._id }
            onToggle={ onSelect }
            text={ `${instrument.brand } ${ instrument.model }` }/>
        ))
      }
    </div>
  )
}

export default InstrumentList