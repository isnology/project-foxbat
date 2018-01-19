import React from 'react'
import Button from '../Button';
// var _array = require('lodash/array')


function NavList({
  displayItems,
  onSelect
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
            onToggle={ ()=>{ onSelect(item) } }
          />
        ))
      }
    </div>
  )
}

export default NavList