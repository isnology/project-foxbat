import React, { Fragment } from 'react'
import ExitButton from './ExitButton'

function RoundExitButton({
  onToggle
}) {
  return (
    <div class="round-exit-button" ><ExitButton onToggle /></div>
  )
}

export default RoundExitButton