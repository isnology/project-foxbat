import React, { Fragment } from 'react'
import Button from '../Button';

function InstrumentList({
  instruments,
  selectedInstrumentType,
  selectedInstrumentBrand,
  onSelect
}) { 

  return (
    <div className="instrument-list">
      {
        instruments.map((instrument) => (
          <Button 
            key={ instrument._id }
            text={ instrument.title }
            onToggle={ ()=>{ onSelect(instrument.title) } }
          />
        ))
      }
    </div>
  )
}

export default InstrumentList