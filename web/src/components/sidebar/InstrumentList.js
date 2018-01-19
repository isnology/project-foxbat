import React from 'react'
import Button from '../Button';

function allTypesFromInstruments(instruments) {
  const typesArray = 
    instruments.map((instrument) => (
      instrument.instrumentClass
    ))
  return typesArray
}

function allBrandsForTypeFromInstruments(instruments, selectedInstrumentType) {
  const brandsArray = 
    instruments.map((instrument) => (
      instrument.brand
    ))
  return brandsArray
}


function InstrumentList({
  instruments,
  selectedInstrumentType,
  selectedInstrumentBrand,
  onSelect // (type, brand?, model?) => {}
}) {

  const brandsArray = allBrandsForTypeFromInstruments(instruments, selectedInstrumentType)
  const typesArray = allTypesFromInstruments(instruments)
  // Listing brands
  console.log(typesArray)
  console.log(brandsArray)
  console.log(selectedInstrumentType)
  return (
    <div className="instrument-list">
      {
        typesArray.map((type) => (
          <Button 
            key={ type }
            text={ type }
            onToggle={ ()=>{ onSelect(selectedInstrumentType, type) } }
          />
        ))
      }
    </div>
  )
}

export default InstrumentList