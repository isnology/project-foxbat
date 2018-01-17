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
        <div className="sidebar-top-buttons">
          { exitButton && <ExitButton />}
        </div>
        <h3>{ topHeading }</h3>
      </div>

      <div className="sidebar-lower">
        {
          !!instruments ? <InstrumentList instruments={instruments}/> : <SidebarText /> 
        }
      </div>
    </div>
  )
}

export default Sidebar