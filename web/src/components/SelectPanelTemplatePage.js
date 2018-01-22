import React, { Fragment } from 'react'
import Button from './Button'
import PanelTemplate from './PanelTemplate'

function SelectPanelTemplatePage({
  firstPanelName,
  firstPanelTemplate,
  secondPanelName,
  secondPanelTemplate,
  onSelectTemplate
}) { 
  return (
    <Fragment>
      <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
      <h2>Choose a template to continue</h2>

      <div className="selection-images">
        <PanelTemplate name={ firstPanelName } clicked={()=>{onSelectTemplate(firstPanelTemplate)}}/>
        <PanelTemplate name={ secondPanelName } clicked={()=>{onSelectTemplate(secondPanelTemplate)}}/>
      </div>

      <Button text="What is this button??"/>

    </Fragment>
  )
}

  export default SelectPanelTemplatePage