import React from 'react'
import Button from '../Button';
var array = require('lodash/array')

function allTypesFromInstruments(instruments) {
  const allTypesArray = 
    instruments.map((instrument) => (
      instrument.instrumentClass
    ))
  const typesArray = array.uniq(allTypesArray)
  return typesArray
}

function allBrandsForTypeFromInstruments(instruments, selectedInstrumentType) {
  const allBrandsArray = 
    instruments.map((instrument) => (
      instrument.brand
    ))
  const brandsArray = array.uniq(allBrandsArray)
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
            onToggle={ ()=>{ onSelect(type, null, null) } }
          />
        ))
      }
    </div>
  )
}

export default InstrumentList