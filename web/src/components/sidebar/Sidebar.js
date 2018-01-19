import React from 'react'
import ExitButton from '../ExitButton'
import InstrumentList from './InstrumentList'
import SidebarText from './SidebarText'
import { sideBarMessages } from '../../constants/messages'
import './sidebar.css'
var array = require('lodash/array') //Lodash

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

  function allTypesFromInstruments(instruments) {
    const allTypesArray = 
      instruments.map((instrument) => (
        instrument.instrumentClass
      ))
    const typesArray = array.uniq(allTypesArray)
    return typesArray
  }
  
  function allBrandsForTypeFromInstruments(instruments, selectedInstrumentType) {
    const brandsArray = 
      instruments.map((instrument) => (
        instrument.instrumentClass
      ))
      // instruments.map(instruments, function(inst) {
      //   if (inst.instrumentClass == selectedInstrumentType) return inst.brand;
      // })
    return brandsArray
  }

  let topHeading
  let displayItems

  if (!selectedSlot) {
    topHeading = sideBarMessages.welcome
  }
  else if (!!selectedSlot && !selectedInstrumentType) {
   topHeading = sideBarMessages.selectInstrumentType
   displayItems = allTypesFromInstruments(instruments)
   console.log("in conditional: ",displayItems)
   console.log("second if")
  }
  else if (!!selectedSlot && !!selectedInstrumentType && !selectedInstrumentBrand) {
    topHeading = sideBarMessages.selectBrandOrModel + " " + selectedInstrumentType.toLowerCase()
    displayItems = allBrandsForTypeFromInstruments(instruments, selectedInstrumentType)
  }
  else if (!!selectedSlot && !!selectedInstrumentType && !!selectedInstrumentBrand) {
    topHeading = sideBarMessages.selectBrandOrModel + " " + selectedInstrumentBrand
  }

  console.log(displayItems)

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
              displayItems={ displayItems }
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