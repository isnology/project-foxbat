import React from 'react'
import Button from '../Button';
import numeral from "numeral";


function turnTextToAnkor(text) {
  if (text.indexOf("http") >= 0) {
    return (
      <a href={ text } target="_blank">Link (opens in new tab)</a>
    )
  }
  else {
    return text
  }
}

const InstrumentPreview = ({
  slots,
  selectedSlot,
  selectedInstrumentModel,
  toggleInstrumentToSlot
}) => {

  let activeSlot
  let activeSlotSize
  let buttonLabel

  if (!!selectedSlot) {
    activeSlot = slots.find(function(slot) { return slot.slotNumber === selectedSlot;})
    activeSlotSize = activeSlot.slotNumber.substring(0,1)
    if (!!activeSlot.instrument) {
      buttonLabel = "Remove"
      selectedInstrumentModel = activeSlot.instrument
    }
    else {
      buttonLabel = "Add"
    }
  }

  function canItGoThere(slotSize, instSize) {
    if (slotSize === 'L' && (instSize === 'L' || instSize === 'M' || instSize === 'S' )) {
      return true
    }
    else if (slotSize === 'M' && (instSize === 'M' || instSize === 'S' )) {
      return true
    }
    else if (slotSize === 'S' && (instSize === 'S' )) {
      return true
    }
    else {
      return false
    }
  }

  return (
    <div className="previewClass">
      <div className="instrument-details">
        <p><strong>Type:</strong> { selectedInstrumentModel.instrumentClass_id.name }</p>
        <p><strong>Model:</strong> { selectedInstrumentModel.model }</p>
        <p><strong>Part no:</strong> { selectedInstrumentModel.partNo }</p>
        <p><strong>Size:</strong> { selectedInstrumentModel.size }</p>
        <p>{ turnTextToAnkor(selectedInstrumentModel.text) }</p>
      </div>
      <div className="instrument-preview">
        <p>{ numeral(selectedInstrumentModel.price/100).format('$0,0.00') } USD</p>
        { !!selectedInstrumentModel.pictureURL ? (<img src={ selectedInstrumentModel.pictureURL } alt="instrument" className="btnimg"/>) : ('') }
      </div>
      { canItGoThere(activeSlotSize, selectedInstrumentModel.size) ? 
        <Button
          text={ buttonLabel }
          onToggle={ ()=>{ toggleInstrumentToSlot(selectedInstrumentModel) } }
        /> : 
        <div className="inactive"><Button
          text={ "Incompatible slot" }
        /></div>
      }
    </div>
  )
}

export default InstrumentPreview