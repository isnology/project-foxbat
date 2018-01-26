import React from 'react'
import ExitButton from '../ExitButton'
import BackButton from '../BackButton'
import NavList from './NavList'
import SidebarText from './SidebarText'
import InstrumentPreview from './InstrumentPreview'
import { sideBarHeadings } from '../../constants/messages'
import _forEach from 'lodash/forEach'
import _toArray from 'lodash/toArray'


export function canItGoThere(slotSize, instSize) {
  if (slotSize === instSize){
    return true
  }
  else if (slotSize === 'L' && (instSize === 'M' || instSize === 'S' )) {
    return true //allow medium (2.25") and small (2") size instruments to fit into a large (3.125") slot due to mounting brackets
  }
  else if (slotSize === 'M' && (instSize === 'S' )) {
    return true //allow small (2") size instruments to fit into a medium (2.25") slot due to mounting brackets
  }
  else {
    return false
  }
}

function Sidebar({
  type,
  instruments,
  slots,
  selectedSlot,           // slot number
  selectedInstrumentType,
  selectedInstrumentBrand,
  selectedInstrumentModel, // This is an object
  onSelect, // (type?, brand?, model?) => {}
  assignInstrumentToSelectedSlot, // Must be given the object
  sidebarClose,
  onBackClick
}) {

  let activeSlot = null
  let activeSlotSize = null
  if (!!selectedSlot && !selectedInstrumentModel) {
    activeSlot = slots[selectedSlot]
    activeSlotSize = selectedSlot.substring(0,1)
  }

  function allTypesFromInstruments(instruments) {
    let types = {}
    _forEach(instruments, (value, key) => {
      if (canItGoThere(activeSlotSize, value.size)) {
        types[value.instrumentClass_id.name] = value.instrumentClass_id.name
      }
    })
    return _toArray(types)
  }

  function allBrandsForTypeFromInstruments(instruments, selectedInstrumentType) {
    let brands = {}
    _forEach(instruments, (value, key) => {
      if (canItGoThere(activeSlotSize, value.size) && selectedInstrumentType === value.instrumentClass_id.name) {
        brands[value.brand] = value.brand
      }
    })
    let temp = _toArray(brands)
    temp.push('All models')
    return temp
  }

  function allModelsForBrandsForTypeFromInstruments(instruments, selectedInstrumentType, selectedInstrumentBrand) {
    let models = {}
    _forEach(instruments, (value, key) => {
      if (canItGoThere(activeSlotSize, value.size) &&
          selectedInstrumentType === value.instrumentClass_id.name &&
          (selectedInstrumentBrand === 'All models' || selectedInstrumentBrand === value.brand)) {
        models[key] = value
      }
    })
    return _toArray(models)
  }

  function RenderToSidebar() {
    if (!!selectedSlot && !selectedInstrumentModel) {
            // Is there an instrument already in the slot?
      return (
        !!slots[selectedSlot] ? (
          <InstrumentPreview
            slots={ slots }
            selectedSlot={ selectedSlot }
            selectedInstrumentModel={ slots[selectedSlot] }
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
  let displayItems = []
  let onSelectItem
  let modelObjects
  let exitButton = true
  let backButton = true

  // Nothing selected
  if (!selectedSlot) {
    topHeading = `Build your ${type.charAt(0).toUpperCase() + type.slice(1)} instrument panel`
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