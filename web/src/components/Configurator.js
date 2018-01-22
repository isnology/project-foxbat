import React from 'react'
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
  onBackClick
}) {
  return (
    <div className="configurator">
      <img src={ logo } alt="Foxbat logo" className="configurator-logo" />
      <div className="panel-container">
        <Panel
          type={ type }
          windowHeight={ windowHeight }
          windowWidth={ windowWidth }
          selectedSlot={ selectedSlot }
          slots={ slots }
          selectSlot={ selectSlot }
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