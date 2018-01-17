import React, { Fragment } from 'react'
import RoundExitButton from './RoundExitButton';

function BasePopUp({ children, onExit, attribute}) {
  return (
    <div className="base-popup">
      <RoundExitButton
        onToggle = { (event) => {
        onExit(attribute)
        } }
      />
      { children }
    </div>
  )
}

export default BasePopUp