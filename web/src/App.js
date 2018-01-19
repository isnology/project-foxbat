import React, { Component, Fragment } from 'react'
import { signIn, signUp, signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import SelectPanelTemplatePage from './components/SelectPanelTemplatePage'
import Button from './components/Button'
import PanelTemplate from './components/PanelTemplate'
import Sidebar from './components/sidebar/Sidebar'
import SaveRegister from './components/SaveRegister'
import { savePanel, updatePanel } from './api/panels'
import Panel from './components/Panel'
import SignIn from './components/SignIn'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    save: null,
    showConfigurator: true,
    instruments: null,
    selectedSlot: null,
    selectedInstrumentType: "Altimeter",
    selectedInstrumentBrand: null,
    templateId: null,
    slottedInstruments: null,
    saveRegister: false,
    signIn: false,
    error: null,
    windowWidth: 0,
    windowHeight: 0
  }

  // BEGIN: code necessary for window size detection
  // (necessary for correct sizing of Panel component)
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  updateWindowDimensions() {
    this.setState({ 
      windowWidth: window.innerWidth, 
      windowHeight: window.innerHeight })
  }
  // END: code necessary for window size detection

  onSignIn = ({ key, email, password }) => {
    this.setState({ error: null })
    signIn({ email, password })
    .then((decodedToken) => {
      this.setState({ decodedToken })
      this.onExitPopUp(key)
    })
    .catch((error) => {
      this.setState({ error })
    })
  }

  onSaveRegister = ({ key, name, email, password }) => {
    const signedIn = !!this.state.decodedToken
    this.setState({ error: null })
    if (!signedIn) {
      signUp({ email, password })
      .then((decodedToken) => {
        this.setState({ decodedToken, panelName: name })
        this.doSave({key, name})
      })
      .catch((error) => {
        // User already exists
        if (/ 403/.test(error.message)) {
          signIn({ email, password })
          .then((decodedToken) => {
            this.setState({ decodedToken })
            this.doSave({key, name})
          })
          .catch((error) => {
            this.setState({ error })
          })
        }
        else {
          this.setState({ error })
        }
      })
    }
    else {
      const panelName = this.state.panelName
      this.doSave({ key, panelName })
    }
  }

  doSave = ({ key, name }) => {
    const data = {
      template: this.state.templateId,
      name: name,
      slots: this.state.slots,
      userId: this.state.decodedToken.sub     // as per passport documentation
    }
    savePanel({ data })
    .then(() => {
      this.onExitPopUp(key)
    })
  }

  onSave = () => {
    const signedIn = !!this.state.decodedToken
    if (signedIn) {
      const key = "saveRegister"
      const name = this.state.panelName
      this.doSave({ key, name })
    }
    else {
      this.setState({ saveRegister: true })
    }
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null, error: null })
  }

  onExitPopUp = ( key ) => {
    this.setState({
      [key]: false
    })
  }

  onSelectTemplate = (templateName) => {
    let slotins
    if (templateName==='a22' || templateName === 'a32'){
      slotins = require('./data').analogSlottedInstruments
    } else { //hardcoded for testing.
      slotins = require('./data').digitalSlottedInstruments
    }
    //require get req for all intruments
    this.setState((prevState) => {
      return({
        instruments: require('./data').instruments, // hard coded for testing
        templateId: templateName,
        slottedInstruments: slotins
      })
    })

    //return
  }

  onSelectSlot = (slot) => {
    let newSlot
    if (slot === this.state.selectedSlot) {
      newSlot = null
    }
    else {
      newSlot = slot
    }
    this.setState({
      selectedSlot: newSlot
    })
  }

  updateIntrumentSelection = (type, brand, model) => {
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

  onClearCurrentPanel = () => {
    this.onSelectTemplate(this.state.templateId)
    this.setState({
      selectedSlot: null,
      selectedInstrumentType: null,
      selectedInstrumentBrand: null,
      selectedInstrumentModel: null
    })
  }

  render() {
    const {
      decodedToken,
      saveRegister,
      signIn,
      instruments,
      selectedSlot,
      selectedInstrumentType,
      selectedInstrumentBrand,
      templateId,
      slottedInstruments,
      windowHeight,
      windowWidth,
      error,
    } = this.state

    const signedIn = !!decodedToken
       
    return (
      <Router>
        <div className="App">
          <Switch>

            <Route path='/' exact render={ () => (
              <WelcomePage />
            )}/>

            <Route path='/app' exact render={ () => (
             !!templateId ? (
               <div>
                <Panel 
                type={templateId}
                windowHeight={windowHeight}
                windowWidth={windowWidth}
                instruments={slottedInstruments}
                selectedSlot={selectedSlot}
                selectSlot={ this.onSelectSlot }
                />
                <Button 
                  text={ "Clear all instruments" }
                  onToggle={ this.onClearCurrentPanel }
                />
                <Sidebar
                  exitButton={ true }
                  backButton={ true }
                  instruments={ instruments }
                  selectedSlot={ selectedSlot }
                  selectedInstrumentType={ selectedInstrumentType }
                  selectedInstrumentBrand={ selectedInstrumentBrand }
                  onSelect={ this.updateIntrumentSelection }
                  sidebarClose={ this.onSidebarClose }
                /> 

                { saveRegister &&
                  <SaveRegister
                      onExit={ this.onExitPopUp }
                      onSubmit={ this.onSaveRegister }
                      errMsg={ !!error ? error.message : null }
                  />
                }

                { signIn &&
                  <SignIn
                      onExit={ this.onExitPopUp }
                      onSubmit={ this.onSignIn }
                      errMsg={ !!error ? error.message : null }
                  />
                }
                { signedIn &&
                  <Button
                    text="Sign Out"
                    onToggle={ this.onSignOut }
                  />
                }
                <Button
                  text="Save"
                  onToggle={ this.onSave }
                />
              </div>
            ):(
              <Redirect to='/' />
            )
            )}/>

            <Route path='/a22' exact render={ () => (
              !!templateId ? (
              <Redirect to='/app' />
              ):(
                <SelectPanelTemplatePage
                  firstPanelName="Analogue A-22 Panel"
                  firstPanelTemplate="a22"
                  secondPanelName="Digital A-22 Panel"
                  secondPanelTemplate="a22Digital"
                />
              )
            )}/>

            <Route path='/a32' exact render={ () => (
              !!templateId ? (
                <Redirect to='/app' />
                ):(
                <Fragment>
                <h1>Welcome to the Foxbat Instrument Panel Configurator</h1>
                <br/>
                <h2>Choose a template to continue</h2>
                <br/>

                <PanelTemplate name="Analogue A-32 Panel" clicked={()=>{this.onSelectTemplate('a32')}}/>
                <PanelTemplate name="Digital A-32 Panel" clicked={()=>{this.onSelectTemplate('a32Digital')}}/>

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