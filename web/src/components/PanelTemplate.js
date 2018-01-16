import React from 'react'

function PanelTemplate({
  name,
  imageURL,
  alt
}) { 
  return (
    <div class="template-with-text">
      <label>
        <h2 class="center" >{ name }</h2>
        <div class="template">
          <img src={ imageURL } alt={ alt }/>
        </div>
      </label>
    </div>
  )
}

export default PanelTemplate