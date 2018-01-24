import React, { Fragment } from 'react'
import SaveRegister from './SaveRegister'
import SignIn from './SignIn'
import MyPanels from './MyPanels'

function ModalWindow({ window, onExit, onSignIn, onSaveRegister, panelList, onSelectPanel, errMsg, signedIn }) {
  const signIn = (window === "signIn")
  const save = (window === "saveRegister")
  const select = (window === "selectPanel")
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
          signedIn={ signedIn }
        />
      }
      { select &&
      <MyPanels
          panelList={ panelList }
          onExit={ onExit }
          onSubmit={ onSelectPanel }
          errMsg={ errMsg }
      />
      }
    </Fragment>
  )
}

export default ModalWindow