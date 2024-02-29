import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Title from './Title';
import {Dropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';


function PlanningSummary() {
  const [data, setData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const APIURL = 'http://localhost:3000/api';
  const navigate = useNavigate();

  useEffect(() => {
    fetch(APIURL+ '/latestPlanning')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);


  if (data === null) {
    return <div 
    style={{color: 'grey',
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
    }}>Loading planning...This might take a few seconds. Please wait.</div>;
  }

  console.log(data);

 { /* TO DO function handleDelete() {
    fetch(APIURL + '/deletePlanning', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.planning.id }),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  }*/}

  const handleDelete = (event) =>{
    event.preventDefault();
    setShowDeleteModal(true); 
  
  }
  const cancelDelete = () => {
    setShowDeleteModal(false);
  };
  const confirmDelete = () => {
    setShowDeleteModal(false);
    fetch(APIURL + '/deletePlanning', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.planning.id }),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
      navigate('/planning');
  }





  return (
    <div>
    <Title titolo="Planning"></Title>
    <Card className='summary' style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Card.Body>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Card.Title className='summary-title'> YOUR LATEST PLANNING</Card.Title>
        <Dropdown className='planning-dropdown'>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ background: 'none', border: ' #C0C0C0' }}>
          <FontAwesomeIcon icon={faEllipsisV} style={{ color: 'grey' }}  />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(event) => handleDelete(event)}  style={{ color: 'rgb(230, 65, 65)', marginRight: '5px' }}>
            <FontAwesomeIcon icon={faTrash} style={{ color: 'rgb(230, 65, 65)', marginRight: '5px' }} />
            Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    
        
        
        
        <Card.Text className='summary-text'>
        <p className='label-summary'>Distance: {data.planning.distance} km</p>
        <p className='label-summary'>Driving Scenarios to tackle:</p>
        {data.scenarioNames.map((scenario, index) => (
          <p key={index}>{scenario.name}</p>
         ))}
        
        
       
        </Card.Text>
        <button className='lesson-performed'>LESSON PERFORMED</button>
      </Card.Body>

    </Card>


    <Modal show={showDeleteModal} onHide={cancelDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
        <Modal.Body>Are you sure you want to delete your planning?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>Go back</Button>
            <Button variant="primary" onClick={confirmDelete}>Delete planning</Button>
          </Modal.Footer>
    </Modal> 
  </div>
   
  );
}

export default PlanningSummary;