// Sidebar.js

import React, { useState } from 'react';
import './css/sidebar.css'; // Import your CSS file for styling
import '../index.css'

import SearchBar from './search';
import { List, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import api from './api';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  width: 360,
  maxWidth: 400,
  borderRadius: 0,
  
}));

const ItemOrganizer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e2e2e2',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  width: 360,
  maxWidth: 400,
  borderRadius: 0,
}));

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.get("/events/1").then(res => {
      // console.log(getEvents.data)
      setEvents(res.data)

      console.log(events)
    })
  }, [events]);

  return (
    <div className={isOpen ? 'sidebar open' : 'sidebar'}>

      <SearchBar onToggle={toggleSidebar}></SearchBar>

      <List sx={{
        // width: '400px',
        maxWidth: 390,
        bgcolor: 'background.paper',
        position: 'relative',
        overflowY: 'auto',

        scrollbarWidth: "none", // Hide the scrollbar for firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
        },
        '&-ms-overflow-style:': {
          display: 'none', // Hide the scrollbar for IE
        },

        '& ul': { padding: 0 },
      }}
        subheader={<li />}
      >
        {events.map((event, index) => {
          let themeKey = event.theme.toLowerCase()

          if (themeKey === "communityservice") {
            themeKey = "service"
          } else if (themeKey === "thoughtfullearning") {
            themeKey = "learning"
          }

          let imagePath = `https://static.campuslabsengage.com/discovery/images/events/${themeKey}.jpg`

          if (event.imagePath) {
            imagePath = `https://se-images.campuslabs.com/clink/images/${event.imagePath}?preset=med-w`
          }

          return (
            <li key={index} className='stack-item'>
              <a href='#'>
                <Item sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                  <div>
                    <h3>{event.name}</h3>

                    <div className='item-info'><CalendarMonthIcon /><span>Event Date</span></div>
                    <div className='item-info'><LocationOnIcon /><span>Event Location</span></div>
                  </div>

                  <img height={"90px"} style={{ borderRadius: "10px" }} src={imagePath}></img>

                </Item>

                <ItemOrganizer>
                  <div style={{ marginTop: 4, fontWeight: "bold" }}>Event Organizer</div>
                  <Rating name="read-only" value={5} readOnly />
                </ItemOrganizer>
              </a>
            </li >
          )
        })}



      </List>
    </div>
  );
};

export default Sidebar;
