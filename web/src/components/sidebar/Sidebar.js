import React from 'react'
import Button from '../Button';
import ExitButton from '../ExitButton';
import InstrumentList from './InstrumentList';
import './sidebar.css';

function Sidebar({
  exitButton,
  backButton,
  topHeading,
  instruments
}) { 
  return (
    <div className="sidebar">
      
      <div className="sidebar-top">
        <div className="sideBar-top-buttons">
          { exitButton && <ExitButton />}
        </div>
        { topHeading }
      </div>

      <div className="sidebar-text">
        <p>1. I am an announcement!</p>
        <p>2. Obey me!</p>
        <p>3. I am an even longer announcement that will probably wrap, I think</p>
      </div>

      {
        !!instruments ? <InstrumentList instruments={instruments}/> : console.log("there are no instruments") 
      }
    </div>
  )
}

export default Sidebar