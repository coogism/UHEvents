// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
// import listBar from './elements/listBar';
import Sidebar from './elements/sidebar';
import MapElement from './elements/map';

import './elements/css/sidebar.css'
import ListBar from './elements/listBar';
import InfoBar from './elements/infoBar';
import api from './elements/api';
import ReviewPopUp from './elements/reviewPopup';

import schoolMap from "./jsons/school_map.json"
import { useEffect } from 'react';

const getBuildingFromLocation = async (event) => {
  for (let index = 0; index < schoolMap.length; index++) {
    const building = schoolMap[index];
    for (let j = 0; j < building.meetingRooms.length; j++) {
      const locationLower = event.location.toLowerCase()
      const room = building.meetingRooms[j].toLowerCase();
      if (room.match(locationLower) !== null || locationLower.match(room) !== null) {
        return building;
      }
    }
  }

  console.log("time ")

  const res = await api.get("/location?term=" + event.location)

  if (res.data.length > 0) {
    console.log(res.data[0].item)
    return res.data[0].item
  }
}

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [event, setEvent] = useState(null)

  const [eventLocation, setEventLocation] = useState(null)

  const [org, setOrg] = useState(null)
  const [ratingOrg, setRatingOrg] = useState(null)

  const [events, setEvents] = useState([])
  const [pages, setPages] = useState(1)

  const [searchValue, setSearchValue] = useState("")

  const onPageChange = (value) => {
    setEvents([])

    setOrg(null)
    setEventLocation(null)

    setEvent(null)
    // 
    getEvents(value, searchValue)
  }

  const getPages = (total) => {
    setPages(Math.ceil(total / 15))
  }

  const getEvents = async (newPage, newSearch) => {
    console.log(newPage)
    api.get("/events/search?query=" + newSearch + "&page=" + (newPage || "")).then(res => {
      setEvents(res.data.events)
      getPages(res.data.total)
    })
  }

  const toggleSidebar = () => {
    // console.log("hi")
    setIsOpen(!isOpen);
  };

  const selectEvent = (event) => {
    setOrg(null)
    setEventLocation(null)

    setEvent(event)

    getBuildingFromLocation(event).then((building_data) => {
      console.log(building_data)
      setEventLocation(building_data)
    })
  }

  const selectOrg = (orgData) => {
    if (!orgData) { setOrg(null); return }
    api.get("/organization/" + orgData.id).then((res) => {
      setOrg(res.data)
    })
  }

  const setOrgRating = (orgData) => {
    setRatingOrg(orgData)
  }
  
  const onRating = () => {
    getEvents()
  }

  const onSearch = (value) => {
    if (searchValue === value) {
      return;
    }

    setSearchValue(value)

    setEvents([])

    setOrg(null)
    setEventLocation(null)
    setEvent(null)

    getEvents("", value)
  }

  useEffect(() => {
    onPageChange(1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Sidebar isOpen={isOpen} onSearch={onSearch} toggleSidebar={toggleSidebar} onSelectEvent={selectEvent} events={events} pages={pages} requestPageChange={onPageChange} />
      <ListBar onClick={toggleSidebar}></ListBar>
      <InfoBar isOpen={isOpen} selectedEvent={event} selectedOrg={org} setOrgRating={setOrgRating} setCurrentOrg={selectOrg}></InfoBar>
      <ReviewPopUp selectedOrg={ratingOrg} setSelectOrg={setRatingOrg} onRating={onRating} />
      <MapElement targetLocation={eventLocation} />
    </div>
  );
}

export default App;