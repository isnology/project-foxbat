import React, { Fragment } from 'react'

function Slot({
  instrument, //object representing the instrument occupying this slot
  panelHeight, //necessary to readjust size and position appropriately
  slotNumber, //assigned and tracked by the caller
  leftRatio, //the left position of this slot as a ratio of the panel height
  bottomRatio, //the top position of this slot as a ratio of the panel height measured from the bottom
  diameterRatio, //the diameter of the slot as a ratio of the panel height
  onClick //callback function to pass back which slot was clicked
}){
  const slotStyle={
    'position': 'absolute',
    'border': 'solid black 2px',
    'border-radius': '50%',
    'background-color': 'black',
    'width': diameterRatio * panelHeight + 'px',
    'height': diameterRatio * panelHeight + 'px',
    'z-index': 2,
    'left': panelHeight * leftRatio + 'px',
    'top': panelHeight * (1-bottomRatio) + 'px',
    'overflow':'hidden'
  }
  return(
      <div className="slot" id={slotNumber} style={slotStyle} onClick={onClick}>
      <img src="http://www.aircraftspruce.com/cache/370-320-/catalog/graphics/1/10-02259.jpg" width="100%"/>
      </div>
  )}

export default Slot