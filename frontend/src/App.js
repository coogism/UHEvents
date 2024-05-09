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
import ReviewPopUp from './elements/reviewPopup';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [event, setEvent] = useState(null)
  const [org, setOrg] = useState(null)
  const [ratingOrg, setRatingOrg] = useState(null)

  const toggleSidebar = () => {
    console.log("hi")
    setIsOpen(!isOpen);
  };

  const selectEvent = (event) => {
    setOrg(null)
    setEvent(event)
  }

  const selectOrg = (orgData) => {
    api.get("/organization/" + orgData.id).then((res) => {
      setOrg(res.data)
    })
  }

  const setOrgRating = (orgData) => {
    setRatingOrg(orgData)
  }
  // selectEvent("test")

  return (
    <div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} onSelectEvent={selectEvent} />
      <ListBar onClick={toggleSidebar}></ListBar>
      <InfoBar isOpen={isOpen} selectedEvent={event} selectedOrg={org} setOrgRating={setOrgRating} setCurrentOrg={selectOrg}></InfoBar>
      <ReviewPopUp selectedOrg={ratingOrg} setSelectOrg={setRatingOrg} />
      <MapElement />
    </div>
  );
}

export default App;