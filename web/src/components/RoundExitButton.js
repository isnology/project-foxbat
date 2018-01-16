import React, { Fragment } from 'react'

function RoundExitButton({
  onToggle
}) { 
  return (
    <Fragment>
      <button class="exit-button" onClick={
          (event) => {
            onToggle()
          }
        }>
        <span class="exit-button-X">x</span>
      </button>
    </Fragment>
  )
}

export default RoundExitButton