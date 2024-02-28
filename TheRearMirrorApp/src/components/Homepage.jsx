import React from "react";
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';






export const Homepage = () => {


  const [data, setData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [index, setIndex] = useState(0);
  const APIURL = 'http://localhost:3000/api'

  useEffect(() => {
    fetch(APIURL+ '/latestPlanning')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

 


  if (data === null) {
    return <div>Loading for your best driving experience</div>;
  }
  
  


  const planning = data.planning;
  


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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


  

  console.log(data);

  return (
    <div className="home">
    <h1 className="title">The Rear Mirror</h1>
    <h2 className="subtitle">Looking Back to safely go forward</h2>

    <div >
    <Carousel 
      pause="hover" 
      touch="TRUE"
      prevLabel= ''
      nextLabel= ''
      activeIndex={index}
      onSelect={handleSelect}
      max-width="100%"
      height="auto"
      >
    <Carousel.Item >
    <Card className='summary'>
      <Card.Body >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}></div>
        <Card.Title className='summary-title'> YOUR LATEST PLANNING</Card.Title>
        <Dropdown className='planning-dropdown' style={{ position: 'absolute', right: 0, top: 0 }}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ background: 'none', border: ' #C0C0C0' }}>
          <FontAwesomeIcon icon={faEllipsisV} style={{ color: 'grey' }}  />
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ zIndex: 9999 }}>
          <Dropdown.Item onClick={(event) => handleDelete(event)}  style={{ color: 'rgb(230, 65, 65)', marginRight: '5px' }}>
            <FontAwesomeIcon icon={faTrash} style={{ color: 'rgb(230, 65, 65)', marginRight: '5px' }} />
            Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  
      
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
    </Carousel.Item>



    <Carousel.Item >
    <Card className='summary'>
      <Card.Body>
        <Card.Title className='summary-title'> YOUR LATEST LESSON</Card.Title>
        <Card.Text className='summary-text'>
        <p className='label-summary'>Date: 20-02-2024</p> 
        <p className='label-summary'> Mistakes: </p>
          <p>Obey Traffic Lights</p>
          <p>Speed Limit</p>
        <p className='label-summary'>Progresses:</p>
          <p>Parallel Parking</p>
          <p>U-Turn</p>
        </Card.Text>
        <button className='lesson-performed'>LESSON PERFORMED</button>
      </Card.Body>
    </Card>
    </Carousel.Item>
    </Carousel>
    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)'  }}>
        {Array.from({ length: 2 }).map((_, idx) => (
          <button
            key={idx}
            style={{
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              background: idx === index ? '#FF6700' : 'gray',
              margin: '0 5px',
              border: 'none',
              outline: 'none',
            }}
            onClick={() => setIndex(idx)}
          />
        ))}
        </div>
    </div>

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

export default Homepage;