import React, { Fragment } from 'react'
import ExitButton from './ExitButton';
import RoundExitButton from './RoundExitButton';
import Button from './Button';

function SaveRegister({
                text,
                FirstInputLabel = false,
                FirstInputType = false,
                SecondInputLabel = false,
                SecondInputType = false,
                ThirdInputLabel = false,
                ThirdInputType = false,
                buttonText,
                onToggle
              }) {
  return (
      <div class="form">
        <ExitButton onToggle />
        <RoundExitButton onToggle />
        <p class="form-text">{ text }</p>

        { FirstInputLabel && FirstInputType ?
            <label>
              <p class="form-text">{ FirstInputLabel }</p>
              <input class="form-text" type={ FirstInputType } name="panel-name"/>
            </label> : null }

        { SecondInputLabel && SecondInputType ?
            <label>
              <p class="form-text">{ SecondInputLabel }</p>
              <input class="form-text" type={ SecondInputType } name="panel-name"/>
            </label> : null }

        { ThirdInputLabel && ThirdInputType ?
            <label>
              <p class="form-text">{ ThirdInputLabel }</p>
              <input class="form-text" type={ ThirdInputType } name="panel-name"/>
            </label> : null }

        <div class="save-form-button">
          <Button text={ buttonText }/>
        </div>
      </div>
  )
}

export default SaveRegister