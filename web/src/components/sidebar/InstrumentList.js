import React from 'react'
import Button from '../Button';

function allTypesFromInstruments(instruments) {

}

function allBrandsForTypeFromInstruments(type, instruments) {
  return [
    'sony',
    'panasonic'
  ]
}

function allModelsForBrandsForTypeFromInstruments(type, instruments) {
  return [
    'playstation',
    'tv'
  ]
}

function InstrumentList({
  instruments,
  selectedInstrumentType,
  selectedInstrumentBrand,
  onSelect // (type, brand?, model?) => {}
}) {

  // Listing brands
  const brands = [] // TODO
  return (
    <div className="instrument-list">
      {
        brands.map((brand) => (
          <Button 
            key={ brand }
            text={ brand }
            onToggle={ ()=>{ onSelect(selectedInstrumentType, brand) } }
          />
        ))
      }
    </div>
  )

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