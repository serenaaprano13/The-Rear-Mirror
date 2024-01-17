//shift alt f autoindent


import React from 'react';
import MyNavbar from './MyNavbar';
import Title from './Title';
import { Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function LessonElement(lesson) {
  const bToEvaluate = lesson.evaluated;
  if (bToEvaluate) {
    <div className="label">
      <div className="text-wrapper">LESSON lesson.date</div>
      <div className="lesson-scenarios">
        lesson.scenario1
        <br />
        lesson.scenario2
        <br />
        lesson.scenario3
      </div>
      <div className="stars">
        {/* <todo: eval stars> */}
        <div className="overlap-group">
          <img className="review" alt="Review" src="review.svg" />
          <img className="img" alt="Review" src="image.svg" />
          <img className="review-2" alt="Review" src="review-2.svg" />
          <img className="review-3" alt="Review" src="review-3.svg" />
          <img className="review-4" alt="Review" src="review-4.svg" />
        </div>
      </div>
    </div>
  }
  else {
    <div className="label">
      <div className="text-wrapper">LESSON lesson.date</div>
      <div className="lesson-scenarios">
        lesson.scenario1
        <br />
        lesson.scenario2
        <br />
        lesson.scenario3
      </div>
      <Button variant="outlined">Evaluate</Button>
    </div>
  }
}

const Evaluation = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [date, setDate] = useState(new Date());

  var React = require('react');
  var ReactDOM = require('react-dom');
  var ScrollArea = require('react-scrollbar');
  return (

    <div>
      <header>
        <Title titolo="Evaluations"></Title>
      </header>
      <Container>
        <Form>


          <Row>
            <Col>
              <Form.Group controlId="datePicker">
                <Form.Label className='fw-light'>Date</Form.Label>
              </Form.Group>
              <Form.Group controlId="duedate">
                <Form.Control
                  type="date"
                  name="duedate"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="validateChk">
                <Form.Label className='fw-light'>Validated</Form.Label>
              </Form.Group>
              <Form.Group controlId="formCheckbox">
                <Form.Check
                  type="checkbox"
                  label=""
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>

      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>







  );
};

export default Evaluation;