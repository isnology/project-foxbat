import React from 'react'
import ExitButton from '../ExitButton';
import InstrumentList from './InstrumentList';
import SidebarText from './SidebarText';
import { sideBarMessages } from '../../constants/messages';
import './sidebar.css';

function Sidebar({
  exitButton,
  backButton,
  instruments,
  selectedSlot, 
  selectedInstrumentType,
  selectedInstrumentBrand,
  onSelect,
  sidebarClose
}) { 

  let topHeading

  if (!selectedSlot) {
    topHeading = sideBarMessages.welcome
  }
  else if (!!selectedSlot && !selectedInstrumentType) {
   topHeading = sideBarMessages.selectInstrumentType
  }
  else if (!!selectedSlot && !!selectedInstrumentType && !selectedInstrumentBrand) {
    topHeading = sideBarMessages.selectBrandOrModel + " " + selectedInstrumentType.toLowerCase()
  }
  else if (!!selectedSlot && !!selectedInstrumentType && !!selectedInstrumentBrand) {
    topHeading = sideBarMessages.selectBrandOrModel + " " + selectedInstrumentBrand
  }

  return (
    <div className="sidebar">
      
      <div className="sidebar-top">
        <div className="sidebar-top-buttons">
          { exitButton && <ExitButton onToggle={ sidebarClose }/>}
        </div>
        <h3>{ topHeading }</h3>
      </div>

      <div className="sidebar-lower">
        {
          (!!instruments && !!selectedSlot) ? 
            <InstrumentList 
              instruments={ instruments }
              selectedInstrumentType={ selectedInstrumentType }
              selectedInstrumentBrand={ selectedInstrumentType }
              onSelect={ onSelect }
            /> : 
            <SidebarText /> 
        }
      </div>
    </div>
  )
}

export default Sidebar