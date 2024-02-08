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
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const myLesson = [];

myLesson.push(new Lesson('2023-02-14', "Red Light", 'Roundabout', 'Speeding', -1, false, 6));


const handleDistanceChange = (e) => {
  // Handle the distance value here
  console.log(e.target.value);
};


const Evaluating = () => {

  const [date, setDate] = useState(new Date());
  // console.log(typeof myLesson.at(1).scenario1);
  return (

    <div>
      <header>
        <Title titolo="Evaluating"></Title>
      </header>
      <div className="scroll-element">
        <Container>
          <Row>
            <Col>
              <b>Distance</b>
            </Col>

            <Col>
              <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
            </Col>
          </Row>

          <Row>

            <Col>
              <Form.Group controlId="distance">
                <Form.Control
                  type="text"
                  name="distance"
                  placeholder="Enter distance"
                  onChange={handleDistanceChange}
                />
              </Form.Group>
            </Col>
            <Form.Group controlId="duedate">
              <Form.Control
                type="date"
                name="duedate"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

          </Row>
          <Row>
            <Col>
              <b>Driving Scenarios</b>
            </Col>
          </Row>
          <Row>
            <div className="scroll-element"></div>
          </Row>
          <Row>
            <Col>
              <b>Mistakes</b>
            </Col>
          </Row>
          <Row>
            <div className="scroll-element"></div>
          </Row>
          <Row>
            <Col>
              <b>Mistakes</b>
            </Col>
          </Row>
          <Row>
            <div className="scroll-element"></div>
          </Row>
          <Row>
            <Col>
              <b>Grade</b>
            </Col>
          </Row>
          <Row>
            <div className="scroll-element"></div>
          </Row>
        </Container>
      </div>

      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>

  );
};

export default Evaluating;