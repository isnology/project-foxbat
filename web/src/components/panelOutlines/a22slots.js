import React, { Fragment } from 'react'
import Slot from './Slot'
import _forEach from 'lodash/forEach'

function findSlot(slotNumber, slots) {
   let instrument = null
    _forEach(slots, (slot) => {
    if (slot.slotNumber === slotNumber) {
      instrument = slot
      return false
    }
  })
  return instrument
}

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
    { leftRatio: 0.2263,
      bottomRatio: 0.8315,
      diameterRatio: 0.266,
      circle: true,
      slotNumber:'L01'},
    {leftRatio: 0.5249,
    bottomRatio: 0.8315,
    diameterRatio: 0.266,
    circle: true,
      slotNumber: 'L02'},
    {leftRatio: 0.8234,
    bottomRatio: 0.8315,
    diameterRatio: 0.266,
    circle: true,
      slotNumber: 'L03'},
    //bottom of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2263,
    bottomRatio: 0.5329,
    diameterRatio: 0.266,
    circle: true,
      slotNumber: 'L04'},
    {leftRatio: 0.5249,
    bottomRatio: 0.5329,
    diameterRatio: 0.266,
    circle: true,
      slotNumber: 'L05'},
    {leftRatio: 0.8234,
    bottomRatio: 0.5329,
    diameterRatio: 0.266,
    circle: true,
      slotNumber: 'L06'},
    //column of the 2.25" (top to bottom)
    {leftRatio: 1.1284,
    bottomRatio: 0.8636,
    diameterRatio: 0.191,
    circle: true,
      slotNumber: 'M01'},
    {leftRatio: 1.1284,
    bottomRatio: 0.6388,
    diameterRatio: 0.191,
    circle: true,
      slotNumber: 'M02'},
    {leftRatio: 1.1284,
    bottomRatio: 0.4125,
    diameterRatio: 0.191,
    circle: true,
      slotNumber: 'M03'},

    //column of the 2" (top to bottom)
    {leftRatio: 1.3612,
    bottomRatio: 0.8555,
    diameterRatio: 0.173,
    circle: true,
      slotNumber: 'S01'},
    {leftRatio: 1.3612,
    bottomRatio: 0.6292,
    diameterRatio: 0.173,
    circle: true,
      slotNumber: 'S02'},
    {leftRatio: 1.3612,
    bottomRatio: 0.4045,
    diameterRatio: 0.173,
    circle: true,
      slotNumber: 'S03'}
  ]
  const a22SlotRatios = [ //TODO: put controls in place to ensure the ordering is adhered to in the instruments array passed in.
    //top of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2758,
    bottomRatio: 0.8634,
    diameterRatio: 0.289,
    circle: true,
      slotNumber: 'L01'},
    {leftRatio: 0.6031,
    bottomRatio: 0.8634,
    diameterRatio: 0.289,
    circle: true,
      slotNumber: 'L02'},
    {leftRatio: 0.9304,
    bottomRatio: 0.8634,
    diameterRatio: 0.289,
    circle: true,
      slotNumber: 'L03'},
    //bottom of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2758,
    bottomRatio: 0.5335,
    diameterRatio: 0.289,
    circle: true,
      slotNumber: 'L04'},
    {leftRatio: 0.6031,
    bottomRatio: 0.5335,
    diameterRatio: 0.289,
    circle: true,
      slotNumber: 'L05'},
    {leftRatio: 0.9304,
    bottomRatio: 0.5335,
    diameterRatio: 0.289,
    circle: true,
      slotNumber: 'L06'},
    //column of the 2.25" (top to bottom)
    {leftRatio: 1.2655,
    bottomRatio: 0.8789,
    diameterRatio: 0.206,
    circle: true,
      slotNumber: 'M01'},
    {leftRatio: 1.2655,
    bottomRatio: 0.6289,
    diameterRatio: 0.206,
    circle: true,
      slotNumber: 'M02'},
    {leftRatio: 1.2655,
    bottomRatio: 0.3763,
    diameterRatio: 0.206,
    circle: true,
      slotNumber: 'M03'},

    //column of the 2" (top to bottom)
    {leftRatio: 1.5284,
    bottomRatio: 0.8557,
    diameterRatio: 0.188,
    circle: true,
      slotNumber: 'S01'},
    {leftRatio: 1.5284,
    bottomRatio: 0.6186,
    diameterRatio: 0.188,
    circle: true,
      slotNumber: 'S02'},
    {leftRatio: 1.5284,
    bottomRatio: 0.3686,
    diameterRatio: 0.188,
    circle: true,
      slotNumber: 'S03'}
  ]
  const a32DigitalSlotRatios = [ //TODO: put controls in place to ensure the ordering is adhered to in the instruments array passed in.
    //column of the 2.25" (top to bottom)
    {leftRatio: 1.4286,
    bottomRatio: 0.8812,
    diameterRatio: 0.191,
    circle: true,
      slotNumber: 'M01'},
    {leftRatio: 1.4286,
    bottomRatio: 0.6629,
    diameterRatio: 0.191,
    circle: true,
      slotNumber: 'M02'},

    //Dynon big screen
    {leftRatio: 0.3162,
    bottomRatio: 0.8796,
    width: 0.8186,
    height: 0.5859,
    circle: false,
    slotNumber: 'D01'},

    //smaller Dynon Walkie-talkie things (top to bottom)
    {leftRatio: 1.2039,
    bottomRatio: 0.8844,
    width: 0.1525,
    height: 0.2970,
    circle: false,
    slotNumber: 'R01'},
    {leftRatio: 1.2039,
    bottomRatio: 0.5746,
    width: 0.1525,
    height: 0.2970,
    circle: false,
    slotNumber: 'R02'}
  ]
  const a22DigitalSlotRatios = [ //TODO: put controls in place to ensure the ordering is adhered to in the instruments array passed in.
    //column of the 2.25" (top to bottom)
    { leftRatio: 0.2896,
      bottomRatio: 0.8095,
      diameterRatio: 0.2073,
      circle: true,
      slotNumber: 'M01'},
    { leftRatio: 0.2896,
      bottomRatio: 0.5610,
      diameterRatio: 0.2073,
      circle: true,
      slotNumber: 'M02'},

    //Dynon big screen
    { leftRatio: 0.5503,
      bottomRatio: 0.8948,
      width: 0.8765,
      height: 0.6250,
      circle: false,
      slotNumber: 'D01'},

    //smaller Dynon Walkie-talkie things (top to bottom)
    { leftRatio: 1.4665,
      bottomRatio: 0.9040,
      width: 0.1662,
      height: 0.3064,
      circle: false,
      slotNumber: 'R01'},
    { leftRatio: 1.4665,
      bottomRatio: 0.5762,
      width: 0.1662,
      height: 0.3064,
      circle: false,
      slotNumber: 'R02'},
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
      break;
    default:
      slotRatios = a22SlotRatios; // in the event that this is called with an incorrect template default to a22 'six pack'
  }

  return(
    <Fragment>
      {
        slotRatios.map((slot) => (
        //slots.map((instrument, index)=> (
          <Slot //if a digital [square] instrument is desired, the instrument object should contain a key called 'shape': 'circle' or 'square' ,or boolean key called 'circle':true or false
            key = { slot.slotNumber }
            instrument = { findSlot( slot.slotNumber, slots ) }
            panelHeight = {height} //necessary to readjust size and slotNumber appropriately
            slotNumber = {slot.slotNumber} //assigned and tracked by the caller
            leftRatio = {slot.leftRatio} //the left slotNumber of this slot as a ratio of the panel height
            bottomRatio = {slot.bottomRatio} //the top slotNumber of this slot as a ratio of the panel height measured from the bottom
            diameterRatio = {slot.diameterRatio} //the diameter of the slot as a ratio of the panel height
            heightRatio = {slot.height}
            widthRatio = {slot.width}
            onClick = {()=>{onClick(slot.slotNumber)}} //each button will
            slots = { slots }
            selectedSlot={selectedSlot}
          />
        ))
      }
    </Fragment>
  )}

  export default A22Slots