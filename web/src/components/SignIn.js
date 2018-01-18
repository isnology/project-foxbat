import React, { Fragment } from 'react'
import Button from './Button'
import BasePopUp from './BasePopUp'

function SignIn({ onExit, onSubmit }) {
  const key = "signIn"
  return (
      <BasePopUp onExit={ onExit } attribute={ key } >
        <p className="form-text">
          Please log in to retrieve your Instument Panel.
        </p>
        <form
            onSubmit={ (event) => {
              // Prevent old-school form submission
              event.preventDefault()

              const elements = event.target.elements // Allows looking up fields using their 'name' attributes
              // Get entered values from fields
              const email = elements.email.value
              const password = elements.password.value

              // Pass this information along to the parent component
              onSubmit({ key, email, password })
            } }
        >
          <label>
            {'Email: '}
            <input
                type='email'
                name='email'
                defaultValue={ " " }
            />
          </label>

          <label>
            {'Password: '}
            <input
                type='password'
                name='password'
            />
          </label>

          <br />
          <Button text="Sign In"
                  onToggle={ () => {} }
          />
        </form>
      </BasePopUp>
  )
}

export default SignIn
