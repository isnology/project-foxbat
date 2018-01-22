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

class App extends Component {
  state = {
    decodedToken: getDecodedToken(), // Restore the previous signed in data
    save: null,
    showConfigurator: true,
    instruments: null,
    templates: null,
    panelName: null, //title user gave their panel
    panel_id: null, // db id of users retrieved panel
    selectedSlot: null,
    selectedInstrumentType: null,
    selectedInstrumentBrand: null,
    selectedInstrumentModel: null,
    templateId: null,
    modalWindow: null,
    slots: null,
    error: null,
    windowWidth: 0,
    windowHeight: 0
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
      this.doSave({ panelName })
    }
  }

  doSave = ({ name }) => {
    this.setState({ error: null })
  //   position: { type: String },
  // instrument_id: { type: Schema.ObjectId, ref: 'Instrument' },
  // size: { type: String }
    console.log("first slot object",this.state.slots[0])
    console.log("slotnumber of first slot", this.state.slots[0].slotNumber)

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
    console.log("backendSlots adding to data:",backendSlots)
    const data = {
      
      template: this.state.templateId,
      name: name,
      slots: backendSlots,
      userId: this.state.decodedToken.sub     // as per passport documentation
    }
    console.log("Data sending to POST /panel",data)
    if (!!this.state.panel_id){
      const id=this.state.panel_id
      updatePanel({id, data})
      .then(() => {
        this.onExitModal()
      })
      .catch((error) => {
        this.setState({ error })
      })
    } else {
      createPanel({data})
      .then(() => {
        this.onExitModal()
      })
      .catch((error) => {
        this.setState({ error })
      })
    }

    
    // .catch((error) => {
    //   // not found
    //   if (/ 404/.test(error.message)) {
    //     return createPanel({ data })
    //     .then(() => {
    //       this.onExitModal()
    //     })
    //   }
    //   else {
    //     throw error
    //   }
    // })
    
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
        // instruments: require('./data').instruments, // hard coded for testing
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
    console.log(model.name, ' has been assigned to slot: ', this.state.selectedSlot)
    // let slotIndex = this.state.slots.findIndex(this.findSlot)
    // console.log('slotindex', slotIndex)
    let newSlots = this.state.slots.map(slot => {
      if (slot.slotNumber === this.state.selectedSlot) {
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

  updateIntrumentSelection = (type, brand, model) => {
    this.setState({
      selectedInstrumentType: type,
      selectedInstrumentBrand: brand,
      selectedInstrumentModel: model
    })
      // if(!!model){
      //   this.assignInstrumentToSlot(model)
      //   //Note: we MUST pass it model, we CAN'T rely on the
      //   // function being able to grab it from the state
      //   // even though we just set the state, because the
      //   // setState method is asynchronous, this means it
      //   // may not have actually been done yet by the time we call
      //   // this function.
      // }
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
    if (this.state.selectedInstrumentModel) {
      this.setState({
        selectedInstrumentModel: null
      })
    }
    else if (this.state.selectedInstrumentBrand) {
      this.setState({
        selectedInstrumentBrand: null
      })
    }
    else if (this.state.selectedInstrumentType) {
      this.setState({
        selectedInstrumentType: null
      })
    }
    else if (this.state.selectedSlot) {
      this.setState({
        selectedSlot: null
      })
    }
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
              <WelcomePage
                onSignOut={ this.onSignOut }
                doModalWindow={ this.doModalWindow }
                signedIn={ signedIn }
              />
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
                  assignInstrumentToSlot={ this.assignInstrumentToSlot }
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

  // BEGIN: code necessary for window size detection
  // (necessary for correct sizing of Panel component)
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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