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
    <Card>
      <Card.Header>It's time to get in the car!</Card.Header>
      <Card.Body>
        <Card.Title> Your latest planning</Card.Title>
        <Card.Text>
        <p>Distance: {data.planning.distance}</p>
        <p>Scenario Names:</p>
        {data.scenarioNames.map((scenario, index) => (
          <p key={index}>{scenario.name}</p>
         ))}
        
        
       
        </Card.Text>
        <Button variant="primary">Lesson performed!</Button>
      </Card.Body>
    </Card>
    </div>
   
  );
}

export default PlanningSummary;