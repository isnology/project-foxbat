import React from 'react'
import ExitButton from './ExitButton'

function RoundExitButton({
  onToggle
}) {
  return (
    <div className="round-exit-button" ><ExitButton onToggle={ onToggle } /></div>
  )
}

export default RoundExitButton