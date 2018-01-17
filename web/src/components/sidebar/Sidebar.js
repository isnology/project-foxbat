import React from 'react'
import Button from '../Button';
import ExitButton from '../ExitButton';
import InstrumentList from './InstrumentList';
import SidebarText from './SidebarText';
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
        <h3>{ topHeading }</h3>
      </div>

      {
        !!instruments ? <InstrumentList instruments={instruments}/> : <SidebarText /> 
      }
    </div>
  )
}

export default Sidebar