import React, { Fragment } from 'react'
import Slot from './Slot'

function A22Slots({
  height,
  // width
  // instruments, //array of objects commented out while component testing
  onClick, //callback function to pass back which slot was clicked
  template //a22, a32, a22digital, a32digital
}){
  const instruments = [
    {instrument:{shape: 'circle'},
    slotNumber:'slot1'},
    {instrument:null,
    slotNumber:'slot2'},
    {instrument:null,
    slotNumber:'slot3'},
    {instrument:null,
    slotNumber:'slot4'},
    {instrument:null,
    slotNumber:'slot5'},
    {instrument:null,
    slotNumber:'slot6'},
    {instrument:null,
    slotNumber:'slot7'},
    {instrument:null,
    slotNumber:'slot8'},
    {instrument:null,
    slotNumber:'slot9'},
    {instrument:null,
    slotNumber:'slot10'},
    {instrument:null,
    slotNumber:'slot11'},
    {instrument:null,
    slotNumber:'slot12'}
      ] //testing purposes

  const a32SlotRatios = [ //TODO: put controls in place to ensure the ordering is adhered to in the instruments array passed in.
    //top of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2263,
    bottomRatio: 0.8315,
    diameterRatio: 0.266},
    {leftRatio: 0.5249,
    bottomRatio: 0.8315,
    diameterRatio: 0.266},
    {leftRatio: 0.8234,
    bottomRatio: 0.8315,
    diameterRatio: 0.266},
    //bottom of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2263,
    bottomRatio: 0.5329,
    diameterRatio: 0.266},
    {leftRatio: 0.5249,
    bottomRatio: 0.5329,
    diameterRatio: 0.266},
    {leftRatio: 0.8234,
    bottomRatio: 0.5329,
    diameterRatio: 0.266},
    //column of the 2.25" (top to bottom)
    {leftRatio: 1.1284,
    bottomRatio: 0.8636,
    diameterRatio: 0.191},
    {leftRatio: 1.1284,
    bottomRatio: 0.6388,
    diameterRatio: 0.191},
    {leftRatio: 1.1284,
    bottomRatio: 0.4125,
    diameterRatio: 0.191},

    //column of the 2" (top to bottom)
    {leftRatio: 1.3612,
    bottomRatio: 0.8555,
    diameterRatio: 0.173},
    {leftRatio: 1.3612,
    bottomRatio: 0.6292,
    diameterRatio: 0.173},
    {leftRatio: 1.3612,
    bottomRatio: 0.4045,
    diameterRatio: 0.173},
  ]
  const a22SlotRatios = [ //TODO: put controls in place to ensure the ordering is adhered to in the instruments array passed in.
    //top of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2758,
    bottomRatio: 0.8634,
    diameterRatio: 0.289},
    {leftRatio: 0.6031,
    bottomRatio: 0.8634,
    diameterRatio: 0.289},
    {leftRatio: 0.9304,
    bottomRatio: 0.8634,
    diameterRatio: 0.289},
    //bottom of the six pack (all 3.125") (left to right)
    {leftRatio: 0.2758,
    bottomRatio: 0.5335,
    diameterRatio: 0.289},
    {leftRatio: 0.6031,
    bottomRatio: 0.5335,
    diameterRatio: 0.289},
    {leftRatio: 0.9304,
    bottomRatio: 0.5335,
    diameterRatio: 0.289},
    //column of the 2.25" (top to bottom)
    {leftRatio: 1.2655,
    bottomRatio: 0.8789,
    diameterRatio: 0.206},
    {leftRatio: 1.2655,
    bottomRatio: 0.6289,
    diameterRatio: 0.206},
    {leftRatio: 1.2655,
    bottomRatio: 0.3763,
    diameterRatio: 0.206},

    //column of the 2" (top to bottom)
    {leftRatio: 1.5284,
    bottomRatio: 0.8557,
    diameterRatio: 0.188},
    {leftRatio: 1.5284,
    bottomRatio: 0.6186,
    diameterRatio: 0.188},
    {leftRatio: 1.5284,
    bottomRatio: 0.3686,
    diameterRatio: 0.188},
  ]
  return(
    <Fragment>
      {
        instruments.map((instrument, index)=> (
          <Slot //if a digital [square] instrument is desired, the instrument object should contain a key called 'shape': 'circle' or 'square' ,or boolean key called 'circle':true or false
            instrument = { !!instrument.instrument ? instrument.instrument : null}
            panelHeight = {height} //necessary to readjust size and position appropriately
            slotNumber = {instrument.slotNumber} //assigned and tracked by the caller
            leftRatio = {a22SlotRatios[index].leftRatio} //the left position of this slot as a ratio of the panel height
            bottomRatio = {a22SlotRatios[index].bottomRatio} //the top position of this slot as a ratio of the panel height measured from the bottom
            diameterRatio = {a22SlotRatios[index].diameterRatio}   //the diameter of the slot as a ratio of the panel height
            onClick = {()=>{onClick(instrument.slotNumber)}} //each button will 
          />
        ))
      }
    </Fragment>
  )}
  
  export default A22Slots