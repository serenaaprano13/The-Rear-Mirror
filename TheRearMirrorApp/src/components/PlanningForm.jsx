//TO DO after i create header component and footer(navbar) component


import React from 'react';
import  MyNavbar  from './MyNavbar';
import  Title  from './Title';
import { Form, Row } from 'react-bootstrap';
import {useState} from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Col from 'react-bootstrap/Col';
import { Multiselect } from 'multiselect-react-dropdown';
import { MDBRange } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const PlanningForm = () => {

  const [ distance, setDistance ] = useState(1);
  const [ finalDistance, setFinalDistance ] = useState(distance);
  const [showDiscardModal, setShowDiscardModal]=useState(false);

  const navigate = useNavigate();
  const handleDiscard = (event) => {
    event.preventDefault();
    setShowDiscardModal(true);
  }
  const confirmDiscard = () => {
    setShowDiscardModal(false);
    navigate('/');
  };
  const cancelDiscard = () => {
    setShowDiscardModal(false);
  };





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
    <Title titolo="Planning"></Title>
    <Form className="planning">
      <Form.Group className="form-group" controlId="plannedDistance">
        <Form.Label className='custom-label'>Planned Distance</Form.Label>{" "}
      </Form.Group>


      <Form.Group>

        {/*MD RANGE SLIDER  */}
        <MDBRange
          defaultValue={2.5}
          min='0'
          max='10'
          step='0.5'
          className="range"
        />
       
      </Form.Group>

      <Form.Group className="form-group" controlId="lastestMistakes">
        <Form.Label className='custom-label'>Recent Mistakes</Form.Label>
    
        <Multiselect
          className="planningMultiSelect"
          options={option} // Options to display in the dropdown
         // selectedValues={selectedValue} // Preselected value to persist in dropdown
          //onSelect={this.onSelect} // Function will trigger on select event
          //onRemove={this.onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown optionsù
          placeholder='Type & search mistakes'
          emptyRecordMsg='Driving scenario not found'
          closeIcon='cancel'
          closeOnSelect={false}
          avoidHighlightFirstOption={true}
          hidePlaceholder={true}
          showArrow={true}
          keepSearchTerm={true}
          
           
        />
      </Form.Group>

      <Form.Group className="form-group" controlId="lastestMistakes">
        <Form.Label className='custom-label'>Untested Scenarios</Form.Label>
        <Multiselect
          className="planningMultiSelect"
          options={option} // Options to display in the dropdown
         // selectedValues={selectedValue} // Preselected value to persist in dropdown
          //onSelect={this.onSelect} // Function will trigger on select event
          //onRemove={this.onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          placeholder='Type & search scenarios'
          emptyRecordMsg='Driving scenario not found'
          closeIcon='cancel'
          closeOnSelect={false}
          avoidHighlightFirstOption={true}
          hidePlaceholder={true}
          showArrow={true} 
          keepSearchTerm={true}
          
        />
      </Form.Group>

      <Form.Group className="d-flex justify-content-center ">
        <button className="discard-btn" onClick={(event)=>handleDiscard(event)}>DISCARD PLAN</button>{" "}
        <button className="save-btn">SAVE PLAN</button>
      </Form.Group>


    </Form>

  <Modal show={showDiscardModal} onHide={cancelDiscard}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Discard</Modal.Title>
    </Modal.Header>
  <Modal.Body>Are you sure you want to discard your changes and leave to Homepage?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={cancelDiscard}>Cancel</Button>
    <Button variant="primary" onClick={confirmDiscard}>Discard planning</Button>
  </Modal.Footer>
</Modal>





 






      
      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>
   
      
        
      

      
      
  );
};

export default PlanningForm;