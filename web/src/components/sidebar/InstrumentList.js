import React from 'react'
import Button from '../Button';
var array = require('lodash/array')


function InstrumentList({
  instruments,
  displayItems,
  selectedInstrumentType,
  selectedInstrumentBrand,
  onSelect // (type, brand?, model?) => {}
}) {
  console.log(displayItems)

  // const brandsArray = allBrandsForTypeFromInstruments(instruments, selectedInstrumentType)
  // const typesArray = allTypesFromInstruments(instruments)
  // // Listing brands
  // console.log(typesArray)
  // console.log(brandsArray)
  // console.log(selectedInstrumentType)
  return (
    <div className="instrument-list">
      {
        displayItems.map((item) => (
          <Button 
            key={ item }
            text={ item }
            onToggle={ ()=>{ onSelect(item, null, null) } }
          />
        ))
      }
    </div>
  )
}

export default InstrumentList