import React, { Component, Fragment } from 'react';
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
    instruments: [{id: 1, brand: "IMB", model: "Alti1000"}, {id: 2, brand: "Falcon", model: "Climonometer"}]
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