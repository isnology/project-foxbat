import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import PlaneSelect from './PlaneSelect'
import FoxbatLogo from './FoxbatLogo'
import a22pic from '../img/a22.jpg'
import a32pic from '../img/a32.jpg'

function WelcomePage({ onSignOut, doModalWindow, signedIn }) {
  return (
    <Fragment>
      <FoxbatLogo />
      
      <div className="welcome-container">
        <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
        <h2>Which plane are you configuring for?</h2>
      
        <div className="selection-images">
          <Link to="/a32">
            <PlaneSelect
            name="A32 Vixxen" 
            imageURL={ a32pic }/>
          </Link>
          <Link to="/a22">
            <PlaneSelect
            name="A22 Foxbat/Kelpie"
            imageURL={ a22pic }/>
          </Link>
        </div>

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
  )
}

export default WelcomePage