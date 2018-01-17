import React, { Fragment } from 'react'
import RoundExitButton from './RoundExitButton';

function BasePopUp({ children, onToggle }) {
  return (
    <div class="form">
      <RoundExitButton onToggle />
      { children }
    </div>
  )
}

export default BasePopUp