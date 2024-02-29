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
import { useEffect } from 'react';


const PlanningForm = () => {

  const [ distance, setDistance ] = useState(10);
  const [ recentMistakes, setRecentMistakes ] = useState([]);
  const [ untestedScenarios, setUntestedScenarios ] = useState([]);
  const [showDiscardModal, setShowDiscardModal]=useState(false);
  const [formState, setFormState] = useState({
    distance: '',
    selectedOptions: [],
  });
  const APIURL = 'http://localhost:3000/api'
  

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

 async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(APIURL + '/createPlanning', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    });
  
    if (response.ok) {
      console.log('Planning data sent to server successfully');
      navigate('/summaryOfPlanning');
    } else {
      console.error('Failed to send Planning data to the server');
    }

   
    
  }



  

  const recentMistakeOption = [
     
     
      {
        name: "U-Turn",
        showing: true,
      },
     
      {
        name: "S-Parking",
        showing: true,
      },
      {
        name: "Speed limit",
        showing: true,
      },
      {
        name: "Emergency Stop",
        showing: true,
      },
      {
        name: "Obey Traffic Signals",
        showing: true,
      },

      {
        name: "Uphill start",
        showing: true,
      },  
    ];


    const untestedScenarioOption = [
    
     
      {
        name: "Lane Change",
        showing: true,
      },
      {
        name: "Merge onto Highway",
        showing: true,
      },
     
    
      {
        name: "Roundabout",
        showing: true,
      },
    
      {
        name: "Yield to Pedestrians",
        showing: true,
      },
     

      {
        name: "Bad Weather",
        showing: true,
      },
      {
        name: "Night driving",
        showing: true,
      },
      {
        name: "Stop", 
        showing: true,
      }, 
      {
        name: "Highway",
        showing: true,
      },
      {
        name:"Emergency maneuvers",
        showing: true,
      },
      {
        name:"Public transportation interaction",
        showing: true,
      }
      
      
     
    ];


  function handleSelectRecentMistakes(selectedOptions) {
      setRecentMistakes(selectedOptions);
  }

  function handleSelectUntestedScenarios(selectedOptions) {
    setUntestedScenarios(selectedOptions);
  }

  // Update formState whenever recentMistakes or untestedScenarios changes
  useEffect(() => {
    setFormState({
      ...formState,
      distance: distance,
      selectedOptions: [...recentMistakes, ...untestedScenarios]
    });
  }, [distance, recentMistakes, untestedScenarios]);


  



  function handleSelect(selectedOptions) {
      console.log(selectedOptions);
      setFormState({
        ...formState,
        selectedOptions: selectedOptions
      });
      console.log(formState);
    }
  function handleRemove(selectedOptions) {
      console.log(selectedOptions);
      setFormState({
        ...formState,
        selectedOptions: selectedOptions
      });
      console.log(formState);
    }

    const handleDistanceChange = (event) => {
     
      setFormState({
        ...formState,
        distance: event.target.value
      });
   
    }

  return (

    <div>
    <Title titolo="Planning"></Title>
    <Form className="planning" onSubmit={handleSubmit}>
      <Form.Group className="form-group" controlId="plannedDistance">
        <Form.Label className='custom-label'>PLANNED DISTANCE (IN KM)</Form.Label>{" "}
      </Form.Group>


      <Form.Group className='mb-3'>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft:'10px', marginRight:'15px' }}>
        <Form.Control type="range" min="1" max="100" value={formState.distance} onChange={handleDistanceChange} style={{ marginRight: '10px', marginLeft:'10px' }} />
            <span>{formState.distance}</span>
      </div>

     
      </Form.Group>

      <Form.Group className="form-group" controlId="lastestMistakes">
        <Form.Label className='custom-label'>YOUR RECENT MISTAKES</Form.Label>
    
        <Multiselect
          className="planningMultiSelect"
          options={recentMistakeOption} // Options to display in the dropdown
          //selectedValues={initialValues} // Preselected value to persist in dropdown
          onSelect={handleSelectRecentMistakes} // Function will trigger on select event
          onRemove={selectedOptions => handleRemove(selectedOptions)} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown optionsù
          placeholder='Type & search mistakes'
          emptyRecordMsg='Driving scenario not found'
          closeIcon='cancel'
          closeOnSelect={false}
          avoidHighlightFirstOption={true}
          hidePlaceholder={true}
          showArrow={true}
          keepSearchTerm={true}
          
          style={{
            chips: {
              background: " #004E98", 
              borderRadius: "20px",
            
          }, 
          searchBox: {
            border: "1px solid  #C0C0C0",
            borderRadius: "13px",
            boxShadow: "0 0 0 0",
            padding: "10px",
            fontSize: "16px",
            color: "#004E98",
            width: "100%",
            height: "80px",
            background: "white",
          
          },
        }
        }
          
           
        />
      </Form.Group>

      <Form.Group className="form-group" controlId="lastestMistakes">
        <Form.Label className='custom-label'>UNTESTED SCENARIOS</Form.Label>
        <Multiselect
          className="planningMultiSelect"
          options={untestedScenarioOption} // Options to display in the dropdown
         // selectedValues={selectedValue} // Preselected value to persist in dropdown
          onSelect={handleSelectUntestedScenarios} // Function will trigger on select event
          onRemove={selectedOptions =>handleRemove(selectedOptions)} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          placeholder='Type & search scenarios'
          emptyRecordMsg='Driving scenario not found'
          closeIcon='cancel'
          closeOnSelect={false}
          avoidHighlightFirstOption={true}
          hidePlaceholder={true}
          showArrow={true} 
          keepSearchTerm={true}
          style={{
            chips: {
              background: " #004E98", 
              borderRadius: "20px",
            
          }, 
          searchBox: {
            border: "1px solid  #C0C0C0",
            borderRadius: "13px",
            boxShadow: "0 0 0 0",
            padding: "10px",
            fontSize: "16px",
            color: "#004E98",
            width: "100%",
            height: "80px",
            background: "white",
          
          },
        }
        }
          
        />
      </Form.Group>

      <Form.Group className="d-flex justify-content-center ">
        <button className="discard-btn" onClick={(event)=>handleDiscard(event)}>DISCARD PLAN</button>{" "}
        <button className="save-btn" type="submit">SAVE PLAN</button>
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