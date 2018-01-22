import React from 'react'

function PanelTemplate({
  name,
  imageURL,
  alt,
  clicked
}) { 
  return (
    //   <div className="landing-page-rectangle">
    // {/* <div className="template-with-text"> */}
    //   <label>
    //     <h3 className="center" >{ name }</h3>
    //     <div 
    //       className="template"
    //       onClick={clicked}
    //     >
    //       <img src={ imageURL } alt={ alt }/>
    //     </div>
    //   </label>
    // </div>
    <button className="landing-page-rectangle"
      onClick={ clicked }
    >
      <h3>{ name }</h3>
      <div className="template">
        <img src={ imageURL } alt={ alt } className='plane-selector'/>
      </div>
    </button>
  )
}

export default PanelTemplate