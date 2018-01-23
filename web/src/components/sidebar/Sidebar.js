import React from 'react'
import ExitButton from '../ExitButton'
import BackButton from '../BackButton'
import NavList from './NavList'
import SidebarText from './SidebarText'
import InstrumentPreview from './InstrumentPreview'
import { sideBarHeadings } from '../../constants/messages'
var _array = require('lodash/array') // Lodash array methods

function Sidebar({
  instruments,
  slots,
  selectedSlot,
  selectedInstrumentType,
  selectedInstrumentBrand,
  selectedInstrumentModel, // This is an object
  onSelect, // (type?, brand?, model?) => {}
  assignInstrumentToSelectedSlot, // Must be given the object
  sidebarClose,
  onBackClick
}) {

  if (!!selectedSlot && !selectedInstrumentModel) {
    var activeSlot = slots.find(function(slot) {
      return slot.slotNumber === selectedSlot;
    })
    var activeSlotSize = activeSlot.slotNumber.substring(0,1)
  }

  // console.log(activeSlot)
  // console.log(activeSlotSize)

  function canItGoThere(instSize) {
    if (activeSlotSize === 'L' && (instSize === 'L' || instSize === 'M' || instSize === 'S' )) {
      return true
    }
    else if (activeSlotSize === 'M' && (instSize === 'M' || instSize === 'S' )) {
      return true
    }
    else if (activeSlotSize === 'S' && (instSize === 'S' )) {
      return true
    }
    else {
      return false
    }
  }

  function allTypesFromInstruments(instruments) {
    const allTypesArray = instruments.filter((instrument) => {
      return canItGoThere(instrument.size) === true
    }).map((instrument) => (
      instrument.instrumentClass_id.name
    ))

    // const allTypesArray =
    //   instruments.map((instrument) => (
    //     instrument.instrumentClass_id.name
    //   ))
    const typesArray = _array.uniq(allTypesArray)
    console.log(typesArray)
    return typesArray
  }

  function allBrandsForTypeFromInstruments(instruments, selectedInstrumentType) {
    const instrumentsWithType = instruments.filter((instrument) => {
      return instrument.instrumentClass_id.name === selectedInstrumentType && canItGoThere(instrument.size) === true
    })
    const allBrands = instrumentsWithType.map((instrument) => instrument.brand)
    const uniqueBrands = _array.uniq(allBrands)

    return uniqueBrands
  }

  function allModelsForBrandsForTypeFromInstruments(instruments, selectedInstrumentType, selectedInstrumentBrand) {
    const instrumentsWithTypeAndBrand = instruments.filter((instrument) => {
      return instrument.instrumentClass_id.name === selectedInstrumentType && instrument.brand === selectedInstrumentBrand && canItGoThere(instrument.size) === true
    })
    return instrumentsWithTypeAndBrand
  }

  function RenderToSidebar() {
    if (!!selectedSlot && !selectedInstrumentModel) {
            // Is there an instrument already in the slot?
      return (
        !!activeSlot.instrument ? (
          <InstrumentPreview
            slots={ slots }
            selectedSlot={ selectedSlot }
            selectedInstrumentModel={ activeSlot.instrument }
            toggleInstrumentToSlot={ assignInstrumentToSelectedSlot }
          />
        ) : (
          <NavList
            displayItems={ displayItems }
            modelObjects={ modelObjects }
            onSelect={ onSelectItem }
          />
        )
      )
    }
    else if ((!!selectedInstrumentModel)) {
      return (
        <InstrumentPreview
          slots={ slots }
          selectedSlot={ selectedSlot }
          selectedInstrumentModel={ selectedInstrumentModel }
          toggleInstrumentToSlot={ assignInstrumentToSelectedSlot }
        />
      )
    }
    else if (!selectedSlot) {
      return <SidebarText />
    }
  }

  let topHeading
  let displayItems
  let onSelectItem
  let modelObjects
  let exitButton = true
  let backButton = true

  // Nothing selected
  if (!selectedSlot) {
    topHeading = sideBarHeadings.welcome
    exitButton = false
    backButton = false
  }
  // Selected a slot
  else if (!!selectedSlot && !selectedInstrumentType) {
    topHeading = sideBarHeadings.selectInstrumentType
    displayItems = allTypesFromInstruments(instruments)
    onSelectItem = (type) => {
      onSelect(type)
    }
  }
  // Select slot and type
  else if (!!selectedSlot && !!selectedInstrumentType && !selectedInstrumentBrand) {
    topHeading = selectedInstrumentType + ": " + sideBarHeadings.selectBrand
    displayItems = allBrandsForTypeFromInstruments(instruments, selectedInstrumentType)
    onSelectItem = (brand) => {
      onSelect(selectedInstrumentType, brand)
   }
  }
  // Select slot, type, and brand
  else if (!!selectedSlot && !!selectedInstrumentType && !!selectedInstrumentBrand && !selectedInstrumentModel) {
    topHeading =  selectedInstrumentBrand + " " + selectedInstrumentType.toLowerCase() + sideBarHeadings.selectModel

    modelObjects = allModelsForBrandsForTypeFromInstruments(instruments, selectedInstrumentType, selectedInstrumentBrand)

    onSelectItem = (model) => {
      onSelect(selectedInstrumentType, selectedInstrumentBrand, model)
   }
  }
  else if (!!selectedSlot && !!selectedInstrumentType && !!selectedInstrumentBrand && !!selectedInstrumentModel) {
    // Now passing objects
    topHeading = `${selectedInstrumentModel.name} (${selectedInstrumentModel.brand})`
  }

  return (
    <div className="sidebar">

      <div className="sidebar-top">
        <div className="sidebar-top-buttons">
          { exitButton ? <ExitButton onToggle={ sidebarClose }/> : <span></span>}
          { backButton && <BackButton onBack={ onBackClick }/> }
        </div>
        <h3>{ topHeading }</h3>
      </div>

      <div className="sidebar-lower">
        <RenderToSidebar />
      </div>
    </div>
  )
}

export default Sidebar