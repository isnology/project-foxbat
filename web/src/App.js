import React, { Component } from 'react';
import './App.css';
import Button from './components/Button';
import Sidebar from './components/sidebar/Sidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button />
        <Sidebar />
      </div>
    );
  }
}

export default App;
