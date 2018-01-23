import React from 'react'
import Button from './Button'
import Sidebar from './sidebar/Sidebar'
import Panel from './Panel'
import logo from '../img/foxbatlogo.png'
import numeral from 'numeral'

function Configurator({
  type,
  windowHeight,
  windowWidth,
  slots, //instruments={slots}
  instruments,
  selectedSlot,
  selectedInstrumentType,
  selectedInstrumentBrand,
  selectedInstrumentModel,
  selectSlot,
  signedIn,
  onSave,
  onClearPanel,
  onSignOut,
  onSelect,
  assignInstrumentToSelectedSlot,
  sidebarClose,
  onBackClick
}) {

  function add(a, b) {
    return a + b;
  }

  function totalCost() {
    let arrayOfPrices = slots.filter((slot) => {
      return slot.instrument !== null
    }).map((slot) => (slot.instrument.price))
    return arrayOfPrices.reduce(add, 0)/100
  }

  return (
    <div className="configurator">
      <img src={ logo } alt="Foxbat logo" className="configurator-logo" />
      <div className="panel-container">
        <div className="running-cost">Current cost (USD): ${ numeral(totalCost()).format('0,0.00') }</div>
        <Panel
          type={ type }
          windowHeight={ windowHeight }
          windowWidth={ windowWidth }
          selectedSlot={ selectedSlot } // This is from state
          slots={ slots }
          selectSlot={ selectSlot } // This is the function
        />
        <div className="panel-button-group">
          <Button
            text={ "Clear panel" }
            onToggle={ onClearPanel }
          />
          { signedIn &&
            <Button
              text="Sign Out"
              onToggle={ onSignOut }
            />
          }
          <Button
            text="Save"
            onToggle={ onSave }
          />
        </div>
      </div>
      <Sidebar
        instruments={ instruments }
        slots={ slots }
        selectedSlot={ selectedSlot }
        selectedInstrumentType={ selectedInstrumentType }
        selectedInstrumentBrand={ selectedInstrumentBrand }
        selectedInstrumentModel={ selectedInstrumentModel }
        onSelect={ onSelect }
        assignInstrumentToSelectedSlot={ assignInstrumentToSelectedSlot }
        sidebarClose={ sidebarClose }
        onBackClick={ onBackClick }
      />
    </div>
  )
}

export default Configurator