import React, { Component, Fragment } from 'react'
import { signIn, signUp, signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import SelectPanelTemplatePage from './components/SelectPanelTemplatePage'
import Button from './components/Button'
import Sidebar from './components/sidebar/Sidebar'
import { savePanel, updatePanel } from './api/panels'
import Panel from './components/Panel'
import ModalWindow from './components/ModalWindow'

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
    modalWindow: null,
    slots: null,
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

  onSignIn = ({ email, password }) => {
    this.setState({ error: null })
    signIn({ email, password })
    .then((decodedToken) => {
      this.setState({ decodedToken })
      this.onExitModal()
    })
    .catch((error) => {
      this.setState({ error })
    })
  }

  onSaveRegister = ({ name, email, password }) => {
    const signedIn = !!this.state.decodedToken
    this.setState({ error: null })
    if (!signedIn) {
      signUp({ email, password })
      .then((decodedToken) => {
        this.setState({ decodedToken, panelName: name })
        this.doSave({name})
      })
      .catch((error) => {
        // User already exists
        if (/ 403/.test(error.message)) {
          return signIn({ email, password })
          .then((decodedToken) => {
            this.setState({ decodedToken })
            this.doSave({name})
          })
        }
        else {
          throw error
        }
      })
      .catch((error) => {
        this.setState({ error })
      })
    }
    else {
      const panelName = this.state.panelName
      this.doSave({ panelName })
    }
  }

  doSave = ({ name }) => {
    const data = {
      template: this.state.templateId,
      name: name,
      slots: this.state.slots,
      userId: this.state.decodedToken.sub     // as per passport documentation
    }
    savePanel({data})
    .then(() => {
      this.onExitModal()
    })
  }

  onSave = () => {
    const signedIn = !!this.state.decodedToken
    if (signedIn) {
      const name = this.state.panelName
      this.doSave({ name })
    }
    else {
      this.setState({ modalWindow: 'saveRegister' })
    }
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null, error: null })
  }

  doModalWindow = ({ name }) => {
    console.log("doing modal window")
    this.setState({ modalWindow: name })
  }

  onExitModal = () => {
    this.setState({ modalWindow: null })
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
        slots: slotins
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
      selectedSlot: newSlot,
      selectedInstrumentType: null,
      selectedInstrumentBrand: null,
      selectedInstrumentModel: null
    })
  }


  assignInstrumentToSlot = (model) => {
    // Note: we must receive the model as a parameter
    // because we cannot rely on the state being updated
    // when this runs. However we can rely on it being correct
    // for the currently selected slot.
    console.log(model, ' has been assigned to slot: ', this.state.selectedSlot)
  }

  updateIntrumentSelection = (type, brand, model) => {

      this.setState({
        selectedInstrumentType: type,
        selectedInstrumentBrand: brand,
        selectedInstrumentModel: model
      })
      if(!!model){
        this.assignInstrumentToSlot(model)
        //Note: we MUST pass it model, we CAN'T rely on the
        // function being able to grab it from the state
        // even though we just set the state, because the 
        // setState method is asynchronous, this means it 
        // may not have actually been done yet by the time we call
        // this function.
      }
    
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
      modalWindow,
      templateId,
      instruments,
      selectedSlot,
      selectedInstrumentType,
      selectedInstrumentBrand,
      slots,
      windowWidth,
      windowHeight,
      error,
    } = this.state

    const signedIn = !!decodedToken
    const modal = !!modalWindow

    return (
      <Router>
        <div className="App">
          <Switch>

            <Route path='/' exact render={ () => (
              <WelcomePage
                onSignOut={ this.onSignOut }
                doModalWindow={ this.doModalWindow }
                signedIn={ signedIn }
              />
            )}/>

            <Route path='/app' exact render={ () => (
             !!templateId ? (
               <div>
                <Panel
                type={templateId}
                windowHeight={windowHeight}
                windowWidth={windowWidth}
                instruments={slots}
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
                  onSelectTemplate={this.onSelectTemplate}
                />
              )
            )}/>

            <Route path='/a32' exact render={ () => (
              !!templateId ? (
                <Redirect to='/app' />
                ):(
                <SelectPanelTemplatePage
                  firstPanelName="Analogue A-32 Panel"
                  firstPanelTemplate="a32"
                  secondPanelName="Digital A-32 Panel"
                  secondPanelTemplate="a32Digital"
                  onSelectTemplate={this.onSelectTemplate}
                />
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

          { modal &&
            <ModalWindow
              window={ modalWindow }
              onExit={ this.onExitModal }
              onSignIn={ this.onSignIn }
              onSaveRegister={ this.onSaveRegister }
              errMsg={ !!error ? error.message : null }
            />
          }
        </div>
      </Router>
    )
  }
}

export default App;