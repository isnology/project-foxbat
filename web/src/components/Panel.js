import React, { Fragment } from 'react'
import A22outline from './panelOutlines/a22'
import A32outline from './panelOutlines/a32'

const A22_SVG_HEIGHT_RATIO = 2.1318
const A32_SVG_HEIGHT_RATIO = 2.1228


function Panel({
  type, //determine which panel to render A22 or A32 (Digital or Analog)
  slotClicked, //tell the parent which slot was clicked
  height
}) { 
  const width = (type === 'a22') ? height*A22_SVG_HEIGHT_RATIO : height*A32_SVG_HEIGHT_RATIO
  const imagePath = (type === 'a22') ? 'images/a22.svg' : 'images/a32.svg'
  const svgContainerStyle = {
    height: height + 'px',
    width: width + 'px'
  }
  const circleStyle = {
    // height: height + 'px',
    // width: width + 'px'
  }
  return (
    <div 
      id = "svgbox"
      style = {svgContainerStyle}
      >
      <div 
        className = "circle"
        id = "circle1"
      />
      {/* <img 
        src = {imagePath}
        height = {height + 'px'}
        width = {width + 'px'}
      /> */}
      {(type === 'a22') ? 
      <A22outline
      height = {height + 'px'}
      width= {width + 'px'}
      /> 
      : 
      <A32outline
      height = {height + 'px'}
      width= {width + 'px'}
      />
      }
      
    </div>
  )
}

export default Panel