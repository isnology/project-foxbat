import React, { Fragment } from 'react'
import ExitButton from './ExitButton'

function RoundExitButton({
  onToggle
}) {
  return (
    <div className="round-exit-button" ><ExitButton onToggle /></div>
  )
}

export default RoundExitButton