import React from 'react'

function Slot({
  instrument, //object representing the instrument occupying this slot
  panelHeight, //necessary to readjust size and position appropriately
  slotNumber, //assigned and tracked by the caller
  leftRatio, //the left position of this slot as a ratio of the panel height
  bottomRatio, //the top position of this slot as a ratio of the panel height measured from the bottom
  diameterRatio, //the diameter of the slot as a ratio of the panel height
  heightRatio,
  widthRatio,
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
    position: 'absolute',
    border: 'solid black 2px',
    backgroundColor: 'black',
    overflow:'hidden',
    zIndex: 2,
    width: slotWidth + 'px',
    height: slotHeight + 'px',
    left: panelHeight * leftRatio + 'px',
    top: panelHeight * (1-bottomRatio) + 'px',
  }
  if (!!diameterRatio) {
    slotStyle.borderRadius = '50%'
  }
  // if (!!instrument && !!instrument.shape){
  //   slotStyle.borderRadius = (instrument.shape === "circle") ? '50%' : '0%'
  // }
  
  return(
      <div className="slot" id={slotNumber} style={slotStyle} onClick={onClick}>
      <img src="http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-02259.jpg" width="100%"/>
      </div>
  )}

export default Slot