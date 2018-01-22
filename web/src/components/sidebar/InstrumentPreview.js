import React from 'react'
import Button from '../Button';

const InstrumentPreview = ({
  slots,
  selectedSlot,
  selectedInstrumentModel,
  toggleInstrumentToSlot
}) => {

  let activeSlot = slots.find(function(slot) {
    return slot.slotNumber === selectedSlot;
  })

  let buttonLabel

  !!activeSlot.instrument ? (buttonLabel = "Remove") : (buttonLabel = "Add")
  console.log("button label", buttonLabel)

  return (
    <div>
      <div className="instrument-details">
        <p><strong>Type:</strong> { selectedInstrumentModel.instrumentClass_id.name }</p>
        <p><strong>Model:</strong> { selectedInstrumentModel.model }</p>
        <p><strong>Part no:</strong> { selectedInstrumentModel.partNo }</p>
        <p><strong>Size:</strong> { selectedInstrumentModel.size }</p>
        <p>{ selectedInstrumentModel.text }</p>
      </div>
      <div className="instrument-preview">
        <p>{ selectedInstrumentModel.price } AUD</p>
        { !!selectedInstrumentModel.pictureURL ? (<img src={ selectedInstrumentModel.pictureURL } alt="instrument" className="btnimg"/>) : ('') }
      </div>
      <Button 
        text={ buttonLabel }
        onToggle={ ()=>{ toggleInstrumentToSlot(selectedInstrumentModel) } }
      />
    </div>
  )
}

export default InstrumentPreview