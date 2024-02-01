//shift alt f autoindent


import React from 'react';
import MyNavbar from './MyNavbar';
import Title from './Title';
import { Form, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Container from 'react-bootstrap/Container';
import { Lesson } from './lessonDefine';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const myLesson = [];
myLesson.push(new Lesson('2023-02-15', "Uphill Start", 'Nightime', 'S-Park', 4, true));
myLesson.push(new Lesson('2023-02-16', "Red Light", 'Roundabout', 'Speeding', 5, true));
myLesson.push(new Lesson('2023-02-14', "Red Light", 'Roundabout', 'Speeding', -1, false));


const Evaluating = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [date, setDate] = useState(new Date());
  // console.log(typeof myLesson.at(1).scenario1);
  return (

    <div>
      <header>
        <Title titolo="Evaluating"></Title>
      </header>
      <Container>
    

      </Container>

      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>

  );
};

export default Evaluating;