import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ onToggle, onSearch }) {
  const inputRef = React.createRef()

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(inputRef.current.children[0].value)
      }}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 380, marginTop: "10px", marginBottom: "10px" }}
    >
      <IconButton onClick={onToggle} sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>

      <InputBase
        ref={inputRef}
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