import React from "react";
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';






export const Homepage = () => {


  const [data, setData] = useState(null);
  const APIURL = 'http://localhost:3000/api'

  useEffect(() => {
    fetch(APIURL+ '/latestPlanning')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  const planning = data.planning;



  

  console.log(data);

  return (
    <div className="home">
    <h1 className="title">The Rear Mirror</h1>
    <h2 className="subtitle">Looking Back to safely go forward</h2>
    <Card className='summary'>
      <Card.Body>
        <Card.Title className='summary-title'> YOUR LATEST PLANNING</Card.Title>
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
  
  </div>
  



  );
};

export default Homepage;
