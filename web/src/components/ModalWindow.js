import React, { Fragment } from 'react'
import SaveRegister from './SaveRegister'
import SignIn from './SignIn'

function ModalWindow({ window, onExit, onSignIn, onSaveRegister, errMsg }) {
  const signIn = (window === "signIn")
  const save = (window === "saveRegister")
  console.log("modal is called:")
  return (
    <Fragment>
      { signIn &&
        <SignIn
          onExit={ onExit }
          onSubmit={ onSignIn }
          errMsg={ errMsg }
        />
      }
      { save &&
        <SaveRegister
          onExit={ onExit }
          onSubmit={ onSaveRegister }
          errMsg={ errMsg }
        />
      }
    </Fragment>
  )
}

export default ModalWindow