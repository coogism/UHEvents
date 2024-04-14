// import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import listBar from './elements/listBar';
import Sidebar from './sidebar';
import MapElement from './elements/map';

function App() {
  const [isOpen,setIsOpen] = useState(false);

  const toggleSidebar = () =>{
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      <div className="content">
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
      </div>
      <MapElement></MapElement>
    </div>
  );
}

export default App;
