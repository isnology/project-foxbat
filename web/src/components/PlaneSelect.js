import React, { Fragment } from 'react'

function PlaneSelect({
  name,
  imageURL,
  onToggle
}) { 
  return (
    <button class="landing-page-rectangle" onClick={
        (event) => {
          onToggle()
        }
      }>
      <h1>{ name }</h1>
      <img src={ imageURL } alt="foxbat plane image"/>
    </button>
  )
}

export default PlaneSelect