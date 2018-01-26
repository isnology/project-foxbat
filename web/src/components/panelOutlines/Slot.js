import React from 'react'

function Slot({
  instrument, //object representing the instrument occupying this slot
  panelHeight, //necessary to readjust size and slotNumber appropriately
  slotNumber, //assigned and tracked by the caller
  leftRatio, //the left slotNumber of this slot as a ratio of the panel height
  bottomRatio, //the top slotNumber of this slot as a ratio of the panel height measured from the bottom
  diameterRatio, //the diameter of the slot as a ratio of the panel height
  heightRatio,
  widthRatio,
  selectedSlot,
  slots,
  onClick //callback function to pass back which slot was clicked
}){
  let slotWidth
  let slotHeight
  if (!!diameterRatio){
    slotWidth =  diameterRatio * panelHeight
    slotHeight = slotWidth
  }else{
    slotWidth =  widthRatio * panelHeight
    slotHeight = heightRatio * panelHeight
  }

  let slotStyle={
    // Variable styles only. Other styles in css
    zIndex: 2,
    width: slotWidth + 'px',
    height: slotHeight + 'px',
    left: (panelHeight * leftRatio) + 'px',
    top: (panelHeight * (1-bottomRatio)) + 'px'
  }
  if (!!diameterRatio) {
    slotStyle.borderRadius = '50%'
  }
  // if (!!instrument && !!instrument.shape){
  //   slotStyle.borderRadius = (instrument.shape === "circle") ? '50%' : '0%'
  // }

  var classForSlot = "slot"
  if (selectedSlot === slotNumber) {
    classForSlot = classForSlot + " selected-slot"
  }

  let thisSlot = slots[slotNumber]

  return(
      <div className={classForSlot} id={slotNumber} style={slotStyle} onClick={onClick}>
        { !!thisSlot ?
          <div className="slot-label">
            {`${thisSlot.name} (${thisSlot.brand})`}
          </div> : '' }
        { !!thisSlot ? <img src={thisSlot.pictureURL} width="100%" alt={thisSlot.name}/> : '' }
      </div>
  )}

export default Slot