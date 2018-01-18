import React, { Component, Fragment } from 'react';
import { signIn, signUp, signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WelcomePage from './components/WelcomePage';
import Button from './components/Button';
import PanelTemplate from './components/PanelTemplate';
import Sidebar from './components/sidebar/Sidebar';
import SaveRegister from './components/SaveRegister';
import { savePanel, updatePanel } from './api/panels'
import Panel from './components/Panel';

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    save: null,
    showConfigurator: true,
    instruments: require('./data').instruments,
    selectedSlot: 1,
    selectedInstrumentType: null,
    selectedInstrumentBrand: null,
    templateId: null,
    slots: null,
    welcome: false,
    saveRegister: false
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

  onSaveRegister = ({ name, email, password }) => {
    const signedIn = !!this.state.decodedToken
    if (!signedIn) {
      signUp({ email, password })
      .then((decodedToken) => {
        this.setState({ decodedToken })
      })
      .catch((error) => {
        this.setState({ error })
      })
    }
    const data = {
      template: this.state.templateId,
      name: name,
      slots: this.state.slots,
      userId: this.state.decodedToken.sub     // as per passport documentation
    }
    savePanel({data})
    .then(() => {
      this.setState({ saveRegister: null })
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

  toggleShowConfigurator = () => {
    this.setState((prevState) => {
      const newShowConfigurator = !prevState.showConfigurator
      return({
        showConfigurator: newShowConfigurator
      })
    })
  }

  updateIntruments = (selection, type, brand, model) => {
      this.setState({
        selectedInstrumentType: type,
        selectedInstrumentBrand: brand,
        selectedInstrumentModel: model
      })
    }

  onSidebarClose = () => {
    this.setState({ 
      selectedSlot: null,
      selectedInstrumentType: null,
      selectedInstrumentBrand: null
    })    
  }

  render() {
    const {
      decodedToken,
      welcome,
      saveRegister,
      showConfigurator,
      instruments,
      selectedSlot,
      selectedInstrumentType,
      selectedInstrumentBrand
    } = this.state

    console.log(instruments)

    const signedIn = !!decodedToken

    return (
      <Router>
        <div className="App">
          <Switch>

            <Route path='/' exact render={ () => (
              <WelcomePage />
            )}/>

            <Route path='/app' exact render={ () => (
              <div>
                <Sidebar
                  exitButton={ true }
                  backButton={ true }
                  instruments={ instruments }
                  selectedSlot={ selectedSlot }
                  selectedInstrumentType={ selectedInstrumentType }
                  selectedInstrumentBrand={ selectedInstrumentBrand }
                  onSelect={ this.updateIntruments }
                  sidebarClose={ this.onSidebarClose }
                /> 
                <Button
                  text="toggle side bar (dev)"
                  onToggle={ this.toggleShowConfigurator }
                />

                { saveRegister &&
                  <SaveRegister
                      onExit={ this.onExitPopUp }
                      onSubmit={ this.onSaveRegister }
                  />
                }
              </div>
            )}/>

            <Route path='/a22' exact render={ () => (
              <Fragment>
                <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
                <br/>
                <h2>Choose a template to continue</h2>
                <br/>

                <PanelTemplate name="Analogue A-22 Panel"/>
                <PanelTemplate name="Digital A-22 Panel"/>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                  <Button text="Lost your panel URL?"/>
                </div>
              </Fragment>
            )}/>

            <Route path='/a32' exact render={ () => (
              <Fragment>
                <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
                <br/>
                <h2>Choose a template to continue</h2>
                <br/>

                <PanelTemplate name="Analogue A-32 Panel"/>
                <PanelTemplate name="Digital A-32 Panel"/>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                  <Button text="Lost your panel URL?"/>
                </div>
              </Fragment>
            )}/>

            <Route path='/alextest' exact render={ () => (
              <Fragment>
                <h1>Alex testing components page</h1>
                <Panel 
                type="a22"
                height={400}/>
              </Fragment>
            )}/>

          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;