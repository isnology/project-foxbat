import React, { Fragment } from 'react'
import Button from '../Button';

function InstrumentList({
  instruments,
  selectedInstrumentType,
  selectedInstrumentBrand
}) { 

  return (
    <div className="instrument-list">
      {
        instruments.map((instrument) => (
          <Button 
            key={ instrument._id }
            text={ instrument.brand }
          />
        ))
      }
    </div>
  )
}

export default InstrumentList