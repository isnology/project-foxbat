import React, { Fragment } from 'react'

function Button({
  text,
  onToggle
}) { 
  return (
    <Fragment>
      <button class="main-button" onClick={
          (event) => {
            onToggle()
          }
        }>
        <span class="button-text">{ text }</span>
      </button>
    </Fragment>
  )
}

export default Button