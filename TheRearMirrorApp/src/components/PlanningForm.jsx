//TO DO after i create header component and footer(navbar) component


import React from 'react';
import  MyNavbar  from './MyNavbar';
import  Title  from './Title';
import { Form, Row } from 'react-bootstrap';
import {useState} from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Col from 'react-bootstrap/Col';
import { Multiselect } from 'multiselect-react-dropdown';

const PlanningForm = () => {

  const [ distance, setDistance ] = useState(1);
  const [ finalDistance, setFinalDistance ] = useState(distance);
  


  const option = [
      {
        name: "Randabout",
        showing: true,
      },
      {
        name: "S parking",
        showing: true,
      },
      {
        name: "Uphill start",
        showing: true,
      },
      {
        name: "Speeding",
        showing: true,
      },
    ];

  
   


  return (

    <div>
      <header>
        <Title titolo="Planning"></Title>
      </header>
    
    <Form className="planning">
      <Form.Group controlId="plannedDistance">
        <Form.Label className='fw-light'>Planned Distance</Form.Label>
        
          <RangeSlider className="range"
            value={distance}
            onChange={e => setDistance(e.target.value)}
            variant='success'
            tooltip='on'
            min={0.5}
            max={10}
            step={0.5}
          />
      </Form.Group>

      <Form.Group controlId="lastestMistakes">
        <Form.Label className='fw-light'>Recent Mistakes</Form.Label>
    
        <Multiselect
          className="planningMultiSelect"
          options={option} // Options to display in the dropdown
         // selectedValues={selectedValue} // Preselected value to persist in dropdown
          //onSelect={this.onSelect} // Function will trigger on select event
          //onRemove={this.onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown optionsù
          placeholder='Type and search mistakes'
          emptyRecordMsg='Driving scenario not found'
          closeIcon='cancel'
          closeOnSelect={false}
          avoidHighlightFirstOption={true}
          hidePlaceholder={true}
          showArrow={true}
          keepSearchTerm={true}
          
           
        />
      </Form.Group>

      <Form.Group controlId="lastestMistakes">
        <Form.Label className='fw-light'>Untested</Form.Label>
        <Multiselect
          options={option} // Options to display in the dropdown
         // selectedValues={selectedValue} // Preselected value to persist in dropdown
          //onSelect={this.onSelect} // Function will trigger on select event
          //onRemove={this.onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />
      </Form.Group>





  </Form>


 






      
      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>
   
      
        
      

      
      
  );
};

export default PlanningForm;