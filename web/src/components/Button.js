import React, { Fragment } from 'react'

function Button({
  text,
  onToggle
}) { 
  return (
    <Fragment>
      <button className="main-button" onClick={
          (event) => {
            onToggle()
          }
        }>
        <span className="button-text">{ text }</span>
      </button>
    </Fragment>
  )
}

export default Button