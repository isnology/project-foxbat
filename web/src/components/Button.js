import React, { Fragment } from 'react'

function Button({ text, onToggle }) {
  return (
    <button
        className="main-button"
        onClick={onToggle}
    >
      <span className="button-text">{ text }</span>
    </button>
  )
}

export default Button