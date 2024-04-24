// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
// import listBar from './elements/listBar';
import Sidebar from './elements/sidebar';
import MapElement from './elements/map';

import './elements/css/sidebar.css'
import ListBar from './elements/listBar';

function App() {
  const [isOpen,setIsOpen] = useState(true);

  const toggleSidebar = () =>{
    console.log("hi")
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      <ListBar onClick={toggleSidebar}></ListBar>
      <MapElement/>
    </div>
  );
}

export default App;