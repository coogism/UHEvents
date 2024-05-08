import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SearchBar({ onToggle }) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 380, marginTop: "10px", marginBottom: "10px" }}
    >
      <IconButton onClick={onToggle} sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search events"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton> 
    </Paper>
  );
}