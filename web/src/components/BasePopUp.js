import React from 'react'
import RoundExitButton from './RoundExitButton';

function BasePopUp({ children, onExit, attribute, errMsg }) {
  return (
    <div className="base-popup">
      <RoundExitButton
        onToggle = { (event) => {
        onExit(attribute)
        } }
      />
      { !!errMsg &&
        <div>
          <p>{ errMsg }</p>
        </div>
      }
      { children }
    </div>
  )
}

export default BasePopUp