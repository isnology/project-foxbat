import React from 'react'
import ExitButton from '../ExitButton'
import NavList from './NavList'
import SidebarText from './SidebarText'
import { sideBarMessages } from '../../constants/messages'
import './sidebar.css'
var _array = require('lodash/array') // Lodash

function Sidebar({
  exitButton,
  backButton,
  instruments,
  selectedSlot, 
  selectedInstrumentType,
  selectedInstrumentBrand,
  onSelect, // (type?, brand?, model?) => {}
  sidebarClose
}) { 

  function allTypesFromInstruments(instruments) {
    const allTypesArray = 
      instruments.map((instrument) => (
        instrument.instrumentClass
      ))
    const typesArray = _array.uniq(allTypesArray)
    return typesArray
  }

  function allBrandsForTypeFromInstruments(instruments, selectedInstrumentType) {
    console.log('allBrandsForTypeFromInstruments running')
    const instrumentsWithType = instruments.filter((instrument) => {
      return instrument.instrumentClass == selectedInstrumentType
    })
    const allBrands = instrumentsWithType.map((instrument) => instrument.brand)
    const uniqueBrands = _array.uniq(allBrands)
    return uniqueBrands
  }

  function allModelsForBrandsForTypeFromInstruments(instruments, selectedInstrumentType, selectedInstrumentBrand) {
    console.log('allModelsForBrandsForTypeFromInstruments running')
    const instrumentsWithTypeAndBrand = instruments.filter((instrument) => {
      return instrument.instrumentClass == selectedInstrumentType && instrument.brand == selectedInstrumentBrand
    })
    return instrumentsWithTypeAndBrand.map((instrument) => instrument.name)
  }

  let topHeading
  let displayItems
  let onSelectItem

  // Nothing selected
  if (!selectedSlot) {
    topHeading = sideBarMessages.welcome
  }
  // Selected a slot
  else if (!!selectedSlot && !selectedInstrumentType) {
   topHeading = sideBarMessages.selectInstrumentType
   displayItems = allTypesFromInstruments(instruments)
   console.log("in conditional: ",displayItems)
   console.log("second if")
   onSelectItem = (type) => {
      onSelect(type)
   }
  }
  // Select slot and type
  else if (!!selectedSlot && !!selectedInstrumentType && !selectedInstrumentBrand) {
    console.log('display items for selected slot and type')
    topHeading = sideBarMessages.selectBrand + selectedInstrumentType.toLowerCase()
    displayItems = allBrandsForTypeFromInstruments(instruments, selectedInstrumentType)
    onSelectItem = (brand) => {
      onSelect(selectedInstrumentType, brand)
   }
  }
  // Select slot, type, and brand
  else if (!!selectedSlot && !!selectedInstrumentType && !!selectedInstrumentBrand) {
    topHeading = sideBarMessages.selectModel + selectedInstrumentBrand + " " + selectedInstrumentType.toLowerCase()
    displayItems = allModelsForBrandsForTypeFromInstruments(instruments, selectedInstrumentType, selectedInstrumentBrand)
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
            <NavList 
              displayItems={ displayItems }
              instruments={ instruments }
              selectedInstrumentType={ selectedInstrumentType }
              selectedInstrumentBrand={ selectedInstrumentType }
              onSelect={ onSelectItem }
            /> : 
            <SidebarText /> 
        }
      </div>
    </div>
  )
}

export default Sidebar