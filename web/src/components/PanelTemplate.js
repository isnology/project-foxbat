import React from 'react'

function PanelTemplate({
  name,
  imageURL,
  alt
}) { 
  return (
    <div className="template-with-text">
      <label>
        <h2 className="center" >{ name }</h2>
        <div className="template">
          <img src={ imageURL } alt={ alt }/>
        </div>
      </label>
    </div>
  )
}

export default PanelTemplate