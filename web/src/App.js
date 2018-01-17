import React, { Component, Fragment } from 'react';
import { signIn, signUp, signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Button from './components/Button';
import PlaneSelect from './components/PlaneSelect';
import Form from './components/Form';
import PanelTemplate from './components/PanelTemplate';
import Sidebar from './components/sidebar/Sidebar';
import SaveRegister from './components/SaveRegister';

class App extends Component {
  state = {
    showSidebar: false,
    instruments: require('./data').instruments,
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    welcome: true,
    register: true,
    save: null
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password })
    .then((decodedToken) => {
      this.setState({ decodedToken })
    })
    .catch((error) => {
      this.setState({ error })
    })
  }

  onSignUp = ({ email, password }) => {
    signUp({ email, password })
    .then((decodedToken) => {
      this.setState({ decodedToken })
    })
    .catch((error) => {
      this.setState({ error })
    })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  onExitPopUp = ( key ) => {
    this.setState({
      [key]: false
    })
  }

toggleShowSidebar = () => {
  this.setState((prevState) => {
    const newShowSidebar = !prevState.showSidebar
    return({
      showSidebar: newShowSidebar
    })
  })
}

  render() {
    const {showSidebar, instruments, decodedToken, welcome, register } = this.state
    console.log(instruments)
    const signedIn = !!decodedToken
    const toggle = false

    return (
      <Router>
        <div className="App">
          <Switch>

            <Route path='/' exact render={ () => (
              <Fragment>
                { welcome &&
                  <Fragment>
                    <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
                    <br/>
                    <h2>Which plane are you configuring for?</h2>
                    <br/>

                    <PlaneSelect name="A32 Vixxen" imageURL=""/>
                    <PlaneSelect name="A22 Foxbat/Kelpie"/>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                      <Button text="Lost your panel URL?"/>
                    </div>
                  </Fragment>
                }

                {
                  showSidebar &&
                  <Sidebar
                    exitButton={ true }
                    backButton={ true }
                    topHeading={ "Top heading!" }
                    instruments= { instruments }
                  />
                }

                { toggle &&
                <Button
                    text="toggle side bar (dev)"
                    onToggle={ (e) => this.toggleShowSidebar() }
                />
                }

                { register &&
                  <SaveRegister onExit={ this.onExitPopUp } onSubmit={ this.onSignUp } />
                }
              </Fragment>
            )}/>

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;