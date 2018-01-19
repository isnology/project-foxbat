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
      <br/>
      <h2>Choose a template to continue</h2>
      <br/>

      <PanelTemplate name={ firstPanelName } clicked={()=>{onSelectTemplate(firstPanelTemplate)}}/>
      <PanelTemplate name={ secondPanelName } clicked={()=>{onSelectTemplate(secondPanelTemplate)}}/>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div>
        <Button text="Lost your panel URL?"/>
      </div>
    </Fragment>
  )
}

  export default SelectPanelTemplatePage