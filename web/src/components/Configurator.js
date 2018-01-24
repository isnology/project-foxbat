import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Sidebar from './sidebar/Sidebar'
import Panel from './Panel'
import SubmitButton from './SubmitButton'
import logo from '../img/foxbatlogo.png'
import numeral from 'numeral'

function Configurator({
  panelSaved,
  type,
  email,
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
  panel_id,
  onSave,
  onSubmit,
  onClearPanel,
  onSignOut,
  onSelect,
  assignInstrumentToSelectedSlot,
  sidebarClose,
  onBackClick,
  onRefreshApp,
  onDeletePanel
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

  
  window.addEventListener("beforeunload", function (e) {
      if (panelSaved === false) {
        e.returnValue = "You may have unsaved changes. Are you sure you want to leave?"
      }
  })

  return (
    <div className="configurator">
      <img src={ logo } alt="Foxbat logo" className="configurator-logo" />
      <div className="panel-container">
        <div className="running-cost">
          <p>Current cost (USD): ${ numeral(totalCost()).format('0,0.00') }</p>
          <p>{ !!panelSaved ? "Changes saved" : "Unsaved changes" }</p>
          <p>Current cost (USD): ${ numeral(totalCost()).format('0,0.00') }</p>
        </div>
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
            text="Save"
            onToggle={ onSave }
          />
          { signedIn &&
            <SubmitButton
              className="panel-button-group"
              onClick={ onSubmit }
              email={ email }
              slotData={ slots }
              templateID={ type }
            />
          }
          <div className="panel-button-low-group">
            { signedIn &&
              <Button
              text="Sign Out"
              onToggle={ onSignOut }
              />
            }
            <Button
              text={ "Clear panel" }
              onToggle={ onClearPanel }
            />
            <Link to="/" onClick={ () => onRefreshApp(true) }>
              <Button
                text="Back to start"
              />
            </Link>
            { signedIn && !!panel_id &&
            <Link to="/" onClick={ onDeletePanel }>
              <Button
                  text="Delete panel"
              />
            </Link>
            }
          </div>
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