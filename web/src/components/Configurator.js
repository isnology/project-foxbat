import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Sidebar from './sidebar/Sidebar'
import Panel from './Panel'
import logo from '../img/foxbatlogo.png'

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
  onBackClick,
  onRefreshApp
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
        <div className="running-cost">Current cost (USD): ${ totalCost() }</div>
        <Panel
          type={ type }
          windowHeight={ windowHeight }
          windowWidth={ windowWidth }
          selectedSlot={ selectedSlot } // This is from state
          slots={ slots }
          selectSlot={ selectSlot } // This is the function
        />
        <div className="panel-button-group">
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
          <Button
            text={ "Clear panel" }
            onToggle={ onClearPanel }
          />     
          <Link to="/" onClick={ onRefreshApp }>
            <Button 
              text="Back to start"
            />
          </Link>
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