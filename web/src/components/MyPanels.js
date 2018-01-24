import React from 'react'
import BasePopUp from './BasePopUp'

function MyPanels({ panelList, onExit, onSubmit, errMsg }) {
  return (
    <BasePopUp onExit={ onExit } errMsg={ errMsg } >

      <h1>Welcome back the <strong>Foxbat</strong> Instrument Panel Configurator</h1>
      <h2>Click the instrument panel name to continue editing</h2>
      <p>OR</p>
      <h2>exit to start a new instrument panel</h2>

      <select defaultValue="" onChange={ (event) => { onSubmit(event.target.value) } } size="5" >
        <option key="1" disabled value=""> -- select a saved dashboard -- </option>
        {!!panelList && panelList.map((panel) => (
            <option key={panel._id} value={ JSON.stringify(panel) } >{ panel.name }</option>
        ))}
      </select>

    </BasePopUp>
  )
}

export default MyPanels