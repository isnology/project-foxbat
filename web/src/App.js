import React, { Component, Fragment } from 'react'
import { signIn, signUp, signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import SelectPanelTemplatePage from './components/SelectPanelTemplatePage'
import { loadPanels, createPanel, updatePanel } from './api/panels'
import { loadInstruments } from './api/instruments'
import { loadTemplates } from './api/templates'
import Panel from './components/Panel'
import ModalWindow from './components/ModalWindow'
import Configurator from './components/Configurator'
import _lang from 'lodash/lang'
import a22Thumb from './img/a22.png'
import a22DigitalThumb from './img/a22digital.png'
import a32Thumb from './img/a32.png'
import a32DigitalThumb from './img/a32digital.png'


class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    save: null,
    showConfigurator: true,
    instruments: null, //list of all instruments from server
    templates: null,
    panelName: null, //title user gave their panel
    panel_id: null, // db id of users retrieved/saved panel
    selectedSlot: null, 
    selectedInstrumentType: null,
    selectedInstrumentBrand: null,
    selectedInstrumentModel: null,
    templateId: null, //which template? a22, a22digital, a32, a32digital
    modalWindow: null, //display sign in/up to save panel window
    slots: null, //state of the users panel slots
    error: null, //for displaying any errors recieved from the server
    windowWidth: 0, //for adaptive sizing of configurator panel
    windowHeight: 0 //for adaptive sizing of configurator panel
  }

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
      this.doSave({ name: panelName })
    }
  }

  doSave = ({ name }) => {
    this.setState({ error: null })
    const backendSlots = this.state.slots.map((slot)=>(
      {
        position: slot.slotNumber,
        instrument_id: !!slot.instrument ? slot.instrument._id : null,
        size: slot.slotNumber.substring(0,1)
      }
    )
    ).filter((slot)=>(
      !!slot.instrument_id
    ))
    const data = {
      
      template: this.state.templateId,
      name: name,
      slots: backendSlots,
      userId: this.state.decodedToken.sub     // as per passport documentation
    }
    if (!!this.state.panel_id){
      const id=this.state.panel_id
      updatePanel(id, {data})
      .then((panel) => {
        console.log("server responded with a successful update:", panel)
        this.onExitModal()
      })
      .catch((error) => {
        this.setState({ error })
      })
    } else {
      createPanel({data})
      .then((panel) => {
        console.log("server responded with a successful save:", panel)
        this.setState({
          panel_id: panel._id,
          panelName: panel.name
        })
        this.onExitModal()
      })
      .catch((error) => {
        this.setState({ error })
      })
    }    
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
    this.setState({ modalWindow: name })
  }

  onExitModal = () => {
    this.setState({ modalWindow: null })
  }

  onClearCurrentPanel = () => {
    this.clearInstrumentsFromSlots()
    this.onSelectTemplate(this.state.templateId)
    this.setState({
      selectedSlot: null,
      selectedInstrumentType: null,
      selectedInstrumentBrand: null,
      selectedInstrumentModel: null
    })
  }

  onSelectTemplate = (templateName) => {
    let slotins
    if (templateName==='a22' || templateName === 'a32'){
      slotins = require('./data').analogSlottedInstruments
    } else {
      slotins = require('./data').digitalSlottedInstruments
    }
    this.setState((prevState) => {
      return({
        templateId: templateName,
        slots: slotins
      })
    })
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
    // console.log(model.name, ' has been assigned to slot: ', this.state.selectedSlot)
    let newSlots = this.state.slots.map(slot => {
      if (slot.slotNumber === slotNumber) {
        !!slot.instrument ? (slot.instrument = null) : (slot.instrument = model)
        return slot
      }
      else {
        return slot
      }
    })
    this.setState({
      slots: newSlots,
      selectedSlot: null,
      selectedInstrumentType: null,
      selectedInstrumentBrand: null,
      selectedInstrumentModel: null
    })
  }
  
  assignInstrumentToSelectedSlot = (model) => {
    this.assignInstrumentToSlot(model, this.state.selectedSlot)
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
      selectedInstrumentBrand: null,
      selectedInstrumentModel: null
    })
  }

  onBackClick = () => {
    if (!!this.state.selectedInstrumentModel) {
      this.setState({
        selectedInstrumentModel: null
      })
    }
    else if (!!this.state.selectedInstrumentBrand) {
      this.setState({
        selectedInstrumentBrand: null
      })
    }
    else if (!!this.state.selectedInstrumentType) {
      this.setState({
        selectedInstrumentType: null
      })
    }
    else if (!!this.state.selectedSlot) {
      this.setState({
        selectedSlot: null
      })
    }
  }

  onClearCurrentPanel = () => {
    this.onSidebarClose()
    let clearedSlots = _lang.cloneDeep(this.state.slots)
    clearedSlots.forEach(slot => slot.instrument = null)

    this.setState({
      slots: clearedSlots
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
      selectedInstrumentModel,
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
              <div>
              <WelcomePage
                onSignOut={ this.onSignOut }
                doModalWindow={ this.doModalWindow }
                signedIn={ signedIn }
              />
              <img src={a22Thumb}/>
              </div>
            )}/>

            <Route path='/app' exact render={ () => (
              !!templateId ? (
                <Configurator 
                  type={templateId}
                  windowHeight={windowHeight}
                  windowWidth={windowWidth}
                  instruments={ instruments }
                  slots={ slots }
                  selectedSlot={ selectedSlot }
                  selectedInstrumentType={ selectedInstrumentType }
                  selectedInstrumentBrand={ selectedInstrumentBrand }
                  selectedInstrumentModel={ selectedInstrumentModel }
                  signedIn={ signedIn }
                  onSave={ this.onSave }
                  selectSlot={ this.onSelectSlot }
                  onClearPanel={ this.onClearCurrentPanel }
                  onSignOut={ this.onSignOut }
                  onSelect={ this.updateIntrumentSelection }
                  assignInstrumentToSelectedSlot={ this.assignInstrumentToSelectedSlot }
                  sidebarClose={ this.onSidebarClose }
                  onBackClick={ this.onBackClick }
                />
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
                  firstPanelImage={ a22Thumb }
                  secondPanelName="Digital A-22 Panel"
                  secondPanelTemplate="a22Digital"
                  secondPanelImage={ a22DigitalThumb }
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
                  firstPanelImage={ a32Thumb }
                  secondPanelName="Digital A-32 Panel"
                  secondPanelTemplate="a32Digital"
                  secondPanelImage={ a32DigitalThumb }
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

  constructor(props) {// code necessary for window size detection
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }// (necessary for correct sizing of Panel component)

  componentWillUnmount() {// code necessary for window size detection
    window.removeEventListener('resize', this.updateWindowDimensions)
  }// (necessary for correct sizing of Panel component)

  updateWindowDimensions() {// code necessary for window size detection
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight })
  }// (necessary for correct sizing of Panel component)
  

  doLoadInstruments() {
    loadInstruments()
    .then((instruments) => {
      this.setState({ instruments })
    })
    .catch(() => {
      this.setState({ instruments: null })
    })
  }

  doLoadTemplates() {
    loadTemplates()
    .then((templates) => {
      this.setState({ templates })
    })
    .catch(() => {
      this.setState({ templates: null })
    })
  }

  // When this App first appears on screen
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
    this.doLoadInstruments()
    this.doLoadTemplates()
  }
}

export default App;