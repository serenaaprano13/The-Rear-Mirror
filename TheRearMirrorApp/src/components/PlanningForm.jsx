//TO DO after i create header component and footer(navbar) component


import React from 'react';
import  MyNavbar  from './MyNavbar';

const PlanningForm = () => {
  return (
    <div className="smartphone-component">
      <header className="header">
        <h1>Planning page: WIP</h1>
      </header>

      <main>
        {/* Content goes here */}
      </main>

      <footer className="navbar">
        <MyNavbar></MyNavbar>
      </footer>
    </div>
  );
};

export default PlanningForm;