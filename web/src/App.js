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
    showConfigurator: true,
    instruments: require('./data').instrumentsType,
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    selectedSlot: 1,
    selectedInstrumentType: null,
    selectedInstrumentBrand: null
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

  toggleShowConfigurator = () => {
    this.setState((prevState) => {
      const newShowConfigurator = !prevState.showConfigurator
      return({
        showConfigurator: newShowConfigurator
      })
    })
  }

  updateIntruments = (selection) => {
    if (!this.state.selectedInstrumentType) {
      this.setState({ 
        selectedInstrumentType: selection,
        instruments: require('./data').instrumentsBrand
      })
    }
    else if (!!this.state.selectedInstrumentType && !this.state.selectedInstrumentBrand) {
      this.setState({ 
        selectedInstrumentBrand: selection,
        instruments: require('./data').instrumentsModel
      })    
    }
  }

  render() {
    const {showConfigurator, instruments, selectedSlot, selectedInstrumentType, selectedInstrumentBrand } = this.state

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
                  showConfigurator && 
                  <Sidebar 
                    exitButton={ true }
                    backButton={ true }
                    instruments={ instruments }
                    selectedSlot={ selectedSlot } 
                    selectedInstrumentType={ selectedInstrumentType }
                    selectedInstrumentBrand={ selectedInstrumentBrand }
                    onSelect={ this.updateIntruments }
                  /> 
                }
                <Button 
                  text="toggle side bar (dev)"
                  onToggle={ this.toggleShowConfigurator }
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