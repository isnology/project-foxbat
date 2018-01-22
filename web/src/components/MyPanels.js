import React, {Fragment} from 'react'

function MyPanels({arrayofpanels}) {

  return (
    <Fragment>
    <FoxbatLogo />
    
    <div className="welcome-container">
      <h1>Welcome back the Foxbat Instrument Panel Configurator</h1>
      <h2>Saved panels for {email}</h2>

      { !signedIn &&
      <Button
        text="Sign In"
        onToggle = { (event) => {
          doModalWindow({ name: 'signIn' })
        } }
      />
      }
      { signedIn &&
        <Button
          text="Sign Out"
          onToggle={ onSignOut }
        />
      }
    </div>
  </Fragment>

    My saved panels
    arrayofpanels.map panel
    panel.type, panel.name, panel.integer
  )
}

export default MyPanels