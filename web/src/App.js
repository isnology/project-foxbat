import React, { Component } from 'react';
import './App.css';
import Button from './components/Button';
import PlaneSelect from './components/PlaneSelect';
import Form from './components/Form';
import PanelTemplate from './components/PanelTemplate';

class App extends Component {
  state = {

  }

  render() {
    return (
      <div className="App">
        <Form />
      </div>
    );
  }
}

export default App;
