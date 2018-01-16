import React, { Component } from 'react';
import './App.css';
import Button from './components/Button';
import Sidebar from './components/sidebar/Sidebar';
import PlaneSelect from './components/PlaneSelect';
import Form from './components/Form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form text="Please enter your email address to save
          and give your panel a name. The url
          for your dashboard will be sent to
          your email address."
          FirstInputLabel="Panel Name"
          FirstInputType="text"
          SecondInputLabel="Email"
          SecondInputType="text"
          ThirdInputLabel="Password"
          ThirdInputType="password"
          buttonText="save"
        />
      </div>
    );
  }
}

export default App;
