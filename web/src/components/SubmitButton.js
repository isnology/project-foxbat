import React from 'react'
import Button from './Button'

function SubmitButton({
  onClick,
  email,
  slotData,
  templateID
}) {
  return (
    <Button text="Test Submission"
    onToggle={ (event) => {
      onClick({email, slotData, templateID})
    }}
    />
  )
}

export default SubmitButton
