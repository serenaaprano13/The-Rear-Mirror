//TO DO after i create header component and footer(navbar) component


import React from 'react';
import  MyNavbar  from './MyNavbar';
import  Title  from './Title';
import { Form, Row } from 'react-bootstrap';
import {useState} from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Col from 'react-bootstrap/Col';

const PlanningForm = () => {

  const [ distance, setDistance ] = useState(1);
  const [ finalDistance, setFinalDistance ] = useState(distance);
  const [ value, setValue ] = React.useState(25);


  const option = [
      {
        text: "Randabout",
        showing: true,
      },
      {
        text: "S parking",
        showing: true,
      },
      {
        text: "Uphill start",
        showing: true,
      },
      {
        text: "Speeding",
        showing: true,
      },
    ];

  
   


  return (

    <div>
      <header>
        <Title titolo="Planning"></Title>
      </header>
    <Form>
      <Form.Group controlId="plannedDistance">
        <Form.Label className='fw-light'>Planned Distance</Form.Label>
        
          <RangeSlider
            value={value}
            onChange={e => setValue(e.target.value)}
            variant='primary'

          />
      </Form.Group>

      <Form.Group controlId="lastestMistakes">
        <Form.Label className='fw-light'>Lastest Mistakes</Form.Label>
      </Form.Group>


  </Form>






      
      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>
   
      
        
      

      
      
  );
};

export default PlanningForm;