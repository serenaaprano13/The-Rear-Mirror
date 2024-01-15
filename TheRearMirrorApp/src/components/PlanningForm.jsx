//TO DO after i create header component and footer(navbar) component


import React from 'react';
import  MyNavbar  from './MyNavbar';
import  Title  from './Title';


const PlanningForm = () => {
  return (

    <div>
      <header>
        <Title titolo="Planning"></Title>
      </header>

      
      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>
   
      
        
      

      
      
  );
};

export default PlanningForm;