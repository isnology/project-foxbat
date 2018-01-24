import React, { Fragment } from 'react'

function ExitButton({ onToggle }) {
  return (
      <Fragment>
          <span className="exit-button-X" onClick={ onToggle }>&#9747;</span>
      </Fragment>
  )
}

export default ExitButton