// Sidebar.js

import React from 'react';
import './css/sidebar.css'; // Import your CSS file for styling
import SearchBar from './search';
import { Stack, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Paper from '@mui/material/Paper';

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
  return (
    <div className={isOpen ? 'sidebar open' : 'sidebar'}>

      <SearchBar onToggle={toggleSidebar}></SearchBar>

      <Stack spacing={2}>
        <div className='stack-item'>
          <Item sx={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
            <div>
              <h3>Event Title</h3>

              <div className='item-info'><CalendarMonthIcon/><span>Event Date</span></div>
              <div className='item-info'><LocationOnIcon/><span>Event Location</span></div>
            </div>

            <img height={"90px"} style={{borderRadius: "10px"}} src='/spirituality.jpg'></img>

          </Item>

          <ItemOrganizer>
            <div style={{marginTop: 4, fontWeight: "bold"}}>Event Organizer</div>
            <Rating name="read-only" value={2} readOnly />
          </ItemOrganizer>
        </div>

        <div className='stack-item'>
          <Item sx={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
            <div>
              <h3>Event Title</h3>

              <div className='item-info'><CalendarMonthIcon/><span>Event Date</span></div>
              <div className='item-info'><LocationOnIcon/><span>Event Location</span></div>
            </div>

            <img height={"90px"} style={{borderRadius: "10px"}} src='/spirituality.jpg'></img>

          </Item>

          <ItemOrganizer>
            <div style={{marginTop: 4, fontWeight: "bold"}}>Event Organizer</div>
            <Rating name="read-only" value={2} readOnly />
          </ItemOrganizer>
        </div>
      </Stack>
    </div>
  );
};

export default Sidebar;
