import React from 'react'

function PlaneSelect({
  name,
  imageURL,
}) { 
  return (
    <button className="landing-page-rectangle">
      <h1>{ name }</h1>
      <img src={ imageURL } alt="foxbat plane" className='plane-selector'/>
    </button>
  )
}

export default PlaneSelect