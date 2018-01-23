import React, { Fragment } from 'react'
import Button from './Button'
import PanelTemplate from './PanelTemplate'
import FoxbatLogo from './FoxbatLogo'

function SelectPanelTemplatePage({
  firstPanelName,
  firstPanelTemplate,
  firstPanelImage,
  secondPanelName,
  secondPanelTemplate,
  secondPanelImage,
  onSelectTemplate
}) { 
  return (
    <Fragment>
      <FoxbatLogo />

      <div className="welcome-container">
        <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
        <h2>Choose a template to continue</h2>

        <div className="selection-images">
          <PanelTemplate name={ firstPanelName } image={firstPanelImage} clicked={()=>{onSelectTemplate(firstPanelTemplate)}}/>
          <PanelTemplate name={ secondPanelName } image={secondPanelImage} clicked={()=>{onSelectTemplate(secondPanelTemplate)}}/>
        </div>

        <Button text="What is this button??"/>
      </div>

    </Fragment>
  )
}

  export default SelectPanelTemplatePage