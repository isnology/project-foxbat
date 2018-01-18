import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import PlaneSelect from './PlaneSelect'

function WelcomePage(

) { 
  return (
    <Fragment>
      <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
      <br/>
      <h2>Which plane are you configuring for?</h2>
      <br/>

      <Link to="/a32">
        <PlaneSelect 
        name="A32 Vixxen" imageURL="http://www.foxbat.com.au/public/editor_images/A32_04.jpg"/>
      </Link>
      <Link to="/a22">
        <PlaneSelect 
        name="A22 Foxbat/Kelpie"
        imageURL="http://www.foxbat.com.au/public/editor_images/A22LS_yellow_01.jpg"/>
      </Link>

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

  export default WelcomePage