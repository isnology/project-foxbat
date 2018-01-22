import React, {Fragment} from 'react'

function Button({ 
  text, 
  onToggle,
  image 
}) {
  const imagePresent = !!image
  return (
    <button
        className="main-button"
        onClick={onToggle}
    >
      <span className="button-text">{ text }</span>
      { imagePresent ? (
        <img src={ image } alt="instrument" className="btnimg"/>
      ):(
        <Fragment/>
      )}
    </button>
  )
}

export default Button