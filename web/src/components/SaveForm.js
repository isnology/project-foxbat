import React, { Fragment } from 'react'
import RoundExitButton from './RoundExitButton';
import Button from './Button';

function SaveForm({
}) { 
  return (
    <div class="form">
      <RoundExitButton/>
      <p class="form-text">Please enter your email address to save
        and give your panel a name. The url
        for your dashboard will be sent to
        your email address.
      </p>
      <label>
        <p class="form-text">Panel name</p>
        <input class="form-text" type="text" name="panel-name"/>
      </label>
      <label>
        <p class="form-text">Email</p>
        <input class="form-text" type="text" name="email"/>
      </label>
      <div class="save-form-button">
        <Button text="save"/>
      </div>
    </div>
  )
}

export default SaveForm