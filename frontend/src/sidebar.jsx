// Sidebar.js

import React from 'react';
import './sidebar.css'; // Import your CSS file for styling

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={isOpen ? 'sidebar open' : 'sidebar'}>
      <button className="toggle-button" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
      <ul className="menu-items">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};

export default Sidebar;
