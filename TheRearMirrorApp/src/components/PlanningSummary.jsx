import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Title from './Title';

function PlanningSummary() {
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

  console.log(data);

  return (
    <div>
    <Title titolo="Planning"></Title>
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
}

export default PlanningSummary;