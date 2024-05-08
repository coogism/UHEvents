// import logo from './logo.svg';
import './App.css';
import React, { useCallback, useState } from 'react';
// import listBar from './elements/listBar';
import Sidebar from './elements/sidebar';
import MapElement from './elements/map';

import './elements/css/sidebar.css'
import ListBar from './elements/listBar';
import InfoBar from './elements/infoBar';
import api from './elements/api';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [event, setEvent] = useState(null)
  const [org, setOrg] = useState(null)

  const toggleSidebar = () => {
    console.log("hi")
    setIsOpen(!isOpen);
  };

  const selectEvent = (event) => {
    setOrg(null)
    setEvent(event)
  }

  const selectOrg = (orgData) => {
    setOrg(orgData)
  }
  // selectEvent("test")

  return (
    <div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} onSelectEvent={selectEvent} />
      <ListBar onClick={toggleSidebar}></ListBar>
      <InfoBar selectedEvent={event} selectedOrg={org} setCurrentOrg={selectOrg}></InfoBar>
      <MapElement />
    </div>
  );
}

export default App;