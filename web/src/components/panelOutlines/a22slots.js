import React, { Fragment } from 'react'
import Slot from './Slot'

function A22Slots({
  height,
  // width
  onClick, //callback function to pass back which slot was clicked
  template, //a22, a32, a22Digital, a32Digital
  selectedSlot, // for conditional formatting
  slots
}){
  

  const a32SlotRatios = [ //TODO: put controls in place to ensure the ordering is adhered to in the instruments array passed in.
    //top of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2263,
    bottomRatio: 0.8315,
    diameterRatio: 0.266,
    circle: true},
    {leftRatio: 0.5249,
    bottomRatio: 0.8315,
    diameterRatio: 0.266,
    circle: true},
    {leftRatio: 0.8234,
    bottomRatio: 0.8315,
    diameterRatio: 0.266,
    circle: true},
    //bottom of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2263,
    bottomRatio: 0.5329,
    diameterRatio: 0.266,
    circle: true},
    {leftRatio: 0.5249,
    bottomRatio: 0.5329,
    diameterRatio: 0.266,
    circle: true},
    {leftRatio: 0.8234,
    bottomRatio: 0.5329,
    diameterRatio: 0.266,
    circle: true},
    //column of the 2.25" (top to bottom)
    {leftRatio: 1.1284,
    bottomRatio: 0.8636,
    diameterRatio: 0.191,
    circle: true},
    {leftRatio: 1.1284,
    bottomRatio: 0.6388,
    diameterRatio: 0.191,
    circle: true},
    {leftRatio: 1.1284,
    bottomRatio: 0.4125,
    diameterRatio: 0.191,
    circle: true},

    //column of the 2" (top to bottom)
    {leftRatio: 1.3612,
    bottomRatio: 0.8555,
    diameterRatio: 0.173,
    circle: true},
    {leftRatio: 1.3612,
    bottomRatio: 0.6292,
    diameterRatio: 0.173,
    circle: true},
    {leftRatio: 1.3612,
    bottomRatio: 0.4045,
    diameterRatio: 0.173,
    circle: true}
  ]
  const a22SlotRatios = [ //TODO: put controls in place to ensure the ordering is adhered to in the instruments array passed in.
    //top of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2758,
    bottomRatio: 0.8634,
    diameterRatio: 0.289,
    circle: true},
    {leftRatio: 0.6031,
    bottomRatio: 0.8634,
    diameterRatio: 0.289,
    circle: true},
    {leftRatio: 0.9304,
    bottomRatio: 0.8634,
    diameterRatio: 0.289,
    circle: true},
    //bottom of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2758,
    bottomRatio: 0.5335,
    diameterRatio: 0.289,
    circle: true},
    {leftRatio: 0.6031,
    bottomRatio: 0.5335,
    diameterRatio: 0.289,
    circle: true},
    {leftRatio: 0.9304,
    bottomRatio: 0.5335,
    diameterRatio: 0.289,
    circle: true},
    //column of the 2.25" (top to bottom)
    {leftRatio: 1.2655,
    bottomRatio: 0.8789,
    diameterRatio: 0.206,
    circle: true},
    {leftRatio: 1.2655,
    bottomRatio: 0.6289,
    diameterRatio: 0.206,
    circle: true},
    {leftRatio: 1.2655,
    bottomRatio: 0.3763,
    diameterRatio: 0.206,
    circle: true},

    //column of the 2" (top to bottom)
    {leftRatio: 1.5284,
    bottomRatio: 0.8557,
    diameterRatio: 0.188,
    circle: true},
    {leftRatio: 1.5284,
    bottomRatio: 0.6186,
    diameterRatio: 0.188,
    circle: true},
    {leftRatio: 1.5284,
    bottomRatio: 0.3686,
    diameterRatio: 0.188,
    circle: true}
  ]
  const a32DigitalSlotRatios = [ //TODO: put controls in place to ensure the ordering is adhered to in the instruments array passed in.
    //column of the 2.25" (top to bottom)
    {leftRatio: 1.4286,
    bottomRatio: 0.8812,
    diameterRatio: 0.191,
    circle: true},
    {leftRatio: 1.4286,
    bottomRatio: 0.6629,
    diameterRatio: 0.191,
    circle: true},

    //Dynon big screen
    {leftRatio: 0.3162,
    bottomRatio: 0.8796,
    width: 0.8186,
    height: 0.5859,
    circle: false},

    //smaller Dynon Walkie-talkie things (top to bottom)
    {leftRatio: 1.2039,
    bottomRatio: 0.8844,
    width: 0.1525,
    height: 0.2970,
    circle: false},
    {leftRatio: 1.2039,
    bottomRatio: 0.5746,
    width: 0.1525,
    height: 0.2970,
    circle: false}
  ]
  const a22DigitalSlotRatios = [ //TODO: put controls in place to ensure the ordering is adhered to in the instruments array passed in.
    //column of the 2.25" (top to bottom)
    {leftRatio: 0.2896,
    bottomRatio: 0.8095,
    diameterRatio: 0.2073,
    circle: true},
    {leftRatio: 0.2896,
    bottomRatio: 0.5610,
    diameterRatio: 0.2073,
    circle: true},

    //Dynon big screen
    {leftRatio: 0.5503,
    bottomRatio: 0.8948,
    width: 0.8765,
    height: 0.6250,
    circle: false},

    //smaller Dynon Walkie-talkie things (top to bottom)
    {leftRatio: 1.4665,
    bottomRatio: 0.9040,
    width: 0.1662,
    height: 0.3064,
    circle: false},
    {leftRatio: 1.4665,
    bottomRatio: 0.5762,
    width: 0.1662,
    height: 0.3064,
    circle: false},
  ]
  let slotRatios = null
  switch (template){
    case 'a22':
      slotRatios = a22SlotRatios;
      break;
    case 'a32':
      slotRatios = a32SlotRatios;
      break;
    case 'a22Digital':
      slotRatios = a22DigitalSlotRatios;
      break;
    case 'a32Digital':
      slotRatios = a32DigitalSlotRatios;
  }

  return(
    <Fragment>
      {
        slots.map((instrument, index)=> (
          <Slot //if a digital [square] instrument is desired, the instrument object should contain a key called 'shape': 'circle' or 'square' ,or boolean key called 'circle':true or false
            key = { instrument.slotNumber }
            instrument = { !!instrument.instrument ? instrument.instrument : null }
            panelHeight = {height} //necessary to readjust size and position appropriately
            slotNumber = {instrument.slotNumber} //assigned and tracked by the caller
            leftRatio = {slotRatios[index].leftRatio} //the left position of this slot as a ratio of the panel height
            bottomRatio = {slotRatios[index].bottomRatio} //the top position of this slot as a ratio of the panel height measured from the bottom
            diameterRatio = {slotRatios[index].diameterRatio} //the diameter of the slot as a ratio of the panel height
            heightRatio = {slotRatios[index].height}
            widthRatio = {slotRatios[index].width}
            onClick = {()=>{onClick(instrument.slotNumber)}} //each button will 
            slots = { slots }
            selectedSlot={selectedSlot}
          />
        ))
      }
    </Fragment>
  )}
  
  export default A22Slots