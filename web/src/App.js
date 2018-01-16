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

class App extends Component {
  state = {
    showSidebar: true,
    instruments: [{id: 1, brand: "IMB", model: "Alti1000"}, {id: 2, brand: "Falcon", model: "Climonometer"}, {id: 3, brand: "IMB", model: "Alti1000"}, {id: 4, brand: "Falcon", model: "Climonometer"}, {id: 5, brand: "IMB", model: "Alti1000"}, {id: 6, brand: "Falcon", model: "Climonometer"}],
    decodedToken: getDecodedToken(), // Restore the previous signed in data
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

toggleShowSidebar = () => {
  this.setState((prevState) => {
    const newShowSidebar = !prevState.showSidebar
    return({
      showSidebar: newShowSidebar
    })
  })
}

  render() {
    const {showSidebar, instruments } = this.state

    return (
      <Router>
        <div className="App">
          <Switch>

            <Route path='/' exact render={ () => (
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
                { 
                  showSidebar && 
                  <Sidebar 
                    exitButton={ true }
                    backButton={ true }
                    topHeading={ "Top heading!" }
                    instruments= { instruments }
                  /> 
                }
                <Button 
                  text="toggle side bar (dev)"
                  onToggle={ this.toggleShowSidebar }
                />
              </Fragment>
              
            )}/>

         


          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;