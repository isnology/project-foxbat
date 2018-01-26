import React, { Component } from 'react'
import { signIn, signUp, signOutNow } from './api/auth'
import { getDecodedToken } from './api/token'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import SelectPanelTemplatePage from './components/SelectPanelTemplatePage'
import { loadPanels, createPanel, updatePanel, deletePanel } from './api/panels'
import { loadInstruments } from './api/instruments'
import { emailPanelDesign } from './api/emailSubmission'
import ModalWindow from './components/ModalWindow'
import Configurator from './components/Configurator'
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
    panelName: null, //title user gave their panel
    panel_id: null, // db id of users retrieved/saved panel
    panelList: null,
    selectedSlot: null,
    selectedInstrumentType: null,
    selectedInstrumentBrand: null,
    selectedInstrumentModel: null,
    templateId: null, //which template? a22, a22digital, a32, a32digital
    modalWindow: null, //display sign in/up to save panel window
    slots: {}, //state of the users panel slots
    templateSlots: null,
    error: null, //for displaying any errors recieved from the server
    panelSaved: null,
    windowWidth: 0, //for adaptive sizing of configurator panel
    windowHeight: 0 //for adaptive sizing of configurator panel
  }

  onSignIn = ({ email, password }) => {
    this.setState({ error: null })
    signIn({ email, password })
    .then((decodedToken) => {
      this.setState({ decodedToken, modalWindow: "selectPanel"})
    })
    .catch((error) => {
      this.setState({ error })
    })
  }

  loadPanelList = () => {
    loadPanels({user: this.state.decodedToken.sub})
    .then((panelList) => {
      this.setState({ panelList: panelList})
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
            this.doSave({ name })
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
    else if (signedIn && !!this.state.panelName) {
      const panelName = this.state.panelName
      this.doSave({ name: panelName })
    }
    else {
      this.doSave({ name })
    }
  }

  doSave = ({ name }) => {
    this.setState({ error: null })
    const data = {
      template: this.state.templateId,
      name: name,
      slots: this.state.slots,
      templateSlots: this.state.templateSlots,
      user_id: this.state.decodedToken.sub     // as per passport documentation
    }
    if (!!this.state.panel_id){
      const id=this.state.panel_id
      updatePanel(id, {data})
      .then((panel) => {
        this.onExitModal()
        this.setState({ panelSaved: true })
      })
      .catch((error) => {
        this.setState({ error })
      })
    } else {
      createPanel({data})
      .then((panel) => {
        this.setState({
          panel_id: panel._id,
          panelName: panel.name,
          panelSaved: true
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
    const panelName = !!this.state.panelName
    if (signedIn && panelName) {
      const name = this.state.panelName
      this.doSave({ name })
    }
    else {
      this.setState({ modalWindow: 'saveRegister' })
    }
  }

  onDeletePanel = () => {
    const id=this.state.panel_id
    deletePanel(id)
    .then(() => {
      this.onRefreshApp(false)
    })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null, error: null, templateId: null, panelName: null, panel_id: null })
    const key = "paneldata"
    //localStorage.removeItem(key)
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
    //let slotins = this.setSlots(templateName)
    let templateSlots
    if (templateName === 'a22' || templateName === 'a32') {
      templateSlots = require('./data').analogSlots
    }
    else {
      templateSlots = require('./data').digitalSlots
    }

    this.setState({
      templateId: templateName,
      slots: {},
      templateSlots: templateSlots
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
      // selectedInstrumentType: null,
      // selectedInstrumentBrand: null,
      // selectedInstrumentModel: null
    })
  }

  assignInstrumentToSlot = (model, slotNumber) => {
    let newSlots = this.state.slots
    if (!!newSlots[slotNumber]) {
      delete newSlots[slotNumber]
    }
    else {
      newSlots[slotNumber] = model
    }

    this.setState({
      slots: newSlots,
      panelSaved: false
    })
    this.onSidebarClose()
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

  onSelectPanel = (panel) => {
    const panelObj = JSON.parse(panel)

    this.setState({
      templateId: panelObj.template,
      panelName: panelObj.name,
      panel_id: panelObj._id,
      slots: panelObj.slots,
      templateSlots: panelObj.templateSlots
    })
   // const obj = {
   //   templateId: panelObj.template,
   //   panelName: panelObj.name,
   //   panel_id: panelObj._id,
   //   slots: slots
   // }
   // const key = "paneldata"
    //localStorage.setItem(key, JSON.stringify(obj))
    this.onExitModal()
  }

  onClearCurrentPanel = () => {
    if (this.state.panelSaved === false) {
      if (window.confirm("Are you sure you want to clear the current panel? Any unsaved changes will be lost.")) {
        this.onSidebarClose()

        this.setState({
          slots: {}
        })
      //const key = "paneldata"
      //if (!!localStorage.getItem(key)) {
      //  let localSlots = JSON.parse(localStorage.getItem(key))
      //  localSlots.slots.map(slot => {
      //    slot.instrument = null
      //    return slot
      //  })
        //localStorage.setItem(key, JSON.stringify(localSlots))
      //}
      }
    }
    else {
      this.onSidebarClose()

      this.setState({
        slots: {}
      })
    }
  }

  refreshApp = () => {
    this.setState({
      panelName: null,
      panel_id: null,
      selectedSlot: null,
      selectedInstrumentType: null,
      selectedInstrumentBrand: null,
      selectedInstrumentModel: null,
      templateId: null,
      modalWindow: null,
      slots: {},
      templateSlots: null
    })

  }

  onRefreshApp = (confirm) => {
    if (this.state.panelSaved === false) {
      if (confirm && !window.confirm("Are you sure you want to exit and return to the start? Any unsaved changes to" +
              " this panel will be lost.")) {
        return
      }
      else {
        this.refreshApp()
      }
    }
    else {
      this.refreshApp()
    }
    //this.onSignOut()
  }

  submitPanel = (email, slotData, templateID, templateSlots) => {
    if (window.confirm("Click OK to confrim and send your panel design to Foxabt Australia")) {
      emailPanelDesign(email, slotData, templateID, templateSlots)
        .then((res) => {
          alert("Panel design has been sent")
        })
        .catch((error) => {
          alert("There was an error sending your design, please get in contact with us to resolve this issue")
        })
    }
  }

  render() {
    const {
      decodedToken,
      modalWindow,
      templateId,
      panel_id,
      instruments,
      selectedSlot,
      selectedInstrumentType,
      selectedInstrumentBrand,
      selectedInstrumentModel,
      slots,
      templateSlots,
      windowWidth,
      windowHeight,
      error,
      panelSaved,
      panelName
    } = this.state

    const signedIn = !!decodedToken
    const modal = !!modalWindow

    return (
      <Router>
        <div className="App">
          <Switch>

            <Route path='/' exact render={ () => (
              !templateId ? (
                <WelcomePage
                  onSignOut={ this.onSignOut }
                  doModalWindow={ this.doModalWindow }
                  signedIn={ signedIn }
                  user={ signedIn && decodedToken.email }
                /> ) : (
                  <Redirect to='/app' />
                )
            )}/>

            <Route path='/app' exact render={ () => (
              !!templateId ? (
                <Configurator
                  panelName={ panelName }
                  panelSaved={ panelSaved }
                  type={templateId}
                  email={ signedIn &&
                    decodedToken.email
                  }
                  windowHeight={windowHeight}
                  windowWidth={windowWidth}
                  instruments={ instruments }
                  slots={ slots }
                  templateSlots={ templateSlots }
                  selectedSlot={ selectedSlot }
                  selectedInstrumentType={ selectedInstrumentType }
                  selectedInstrumentBrand={ selectedInstrumentBrand }
                  selectedInstrumentModel={ selectedInstrumentModel }
                  signedIn={ signedIn }
                  panel_id={ panel_id }
                  onSave={ this.onSave }
                  onSubmit={ this.submitPanel }
                  selectSlot={ this.onSelectSlot }
                  onClearPanel={ this.onClearCurrentPanel }
                  onSignOut={ this.onSignOut }
                  onSelect={ this.updateIntrumentSelection }
                  assignInstrumentToSelectedSlot={ this.assignInstrumentToSelectedSlot }
                  sidebarClose={ this.onSidebarClose }
                  onBackClick={ this.onBackClick }
                  onRefreshApp={ this.onRefreshApp }
                  onDeletePanel={ this.onDeletePanel }
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

          </Switch>

          { modal &&
            <ModalWindow
              window={ modalWindow }
              onExit={ this.onExitModal }
              onSignIn={ this.onSignIn }
              onSaveRegister={ this.onSaveRegister }
              loadPanelList={ this.loadPanelList }
              panelList={ this.state.panelList }
              onSelectPanel={ this.onSelectPanel }
              errMsg={ !!error ? error.message : null }
              signedIn={ signedIn }
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
      let list = {}
      instruments.map((instrument) => {
        list[instrument._id] = instrument
      })
      //this.setState({ instruments })
      //console.log("instruments:", list)
      this.setState({ instruments: list })
    })
    .catch(() => {
      this.setState({ instruments: null })
    })
  }

  //restoreFromLocalStorage() {
  //  let obj
  //  if (!!this.state.decodedToken) {
  //    const key = "paneldata"
  //    obj = JSON.parse(localStorage.getItem(key))
  //    !!obj && this.setState({
  //      templateId: obj.templateId,
  //      panelName: obj.panelName,
  //      panel_id: obj.panel_id,
  //      slots: obj.slots
  //    })
  //  }
  //}

  // When this App first appears on screen
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions)
    this.doLoadInstruments()
    //this.restoreFromLocalStorage()
  }
}

export default App;