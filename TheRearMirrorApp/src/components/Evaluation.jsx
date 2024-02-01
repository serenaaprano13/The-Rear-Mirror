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

function GetStars(n)
{
  return
   for (let i = 0; i < n; i++) {
    <FontAwesomeIcon icon={faStar} size="lg"/>
} 
}
function LessonElement(wrap) {
  const lesson = wrap.lesson;
  const bToEvaluate = lesson.evaluated;
  if (bToEvaluate) {
    return <div className="label">
      <div className="scroll-element">


        <Container>
          <Row>
            <Col>
              <div className="text-wrapper">
                <b>LESSON {lesson.date}</b>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={7}>{lesson.scenario1}</Col>
            <Col sm={5}></Col>
          </Row>
          <Row>
            <Col sm={7}>{lesson.scenario2}</Col>
            <Col sm={5}></Col>
          </Row>
          <Row>
            <Col sm={7}>{lesson.scenario3}</Col>
            <Col sm={5}>
              {Array.from({ length: lesson.grade }, (_, key) => (
                <FontAwesomeIcon icon={faStar} size="1x"/>
              ))}
            </Col>
          </Row>

        </Container>
        <br />
      </div>
    </div>
  }
  else {
    return <div className="label">
      <div className="scroll-element">
        <Container>
          <Row>
            <Col>
              <div className="text-wrapper">
                <b>LESSON {lesson.date}</b>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={7}>{lesson.scenario1}</Col>
            <Col sm={5}></Col>
          </Row>
          <Row>
            <Col sm={7}>{lesson.scenario2}</Col>
            <Col sm={5}></Col>
          </Row>
          <Row>
            <Col sm={7}>{lesson.scenario3}</Col>
            <Col sm={5}><Link to="/evaluating"><button>Evaluate</button></Link></Col>
          </Row>

        </Container>
        <br />
      </div>
    </div>
  }
}

const Evaluation = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [date, setDate] = useState(new Date());
  // console.log(typeof myLesson.at(1).scenario1);
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
          <br /><br />
          <div className="scroll-container">
            <Form.Group controlId="LessonElements">
              {myLesson.map((a, i) => <LessonElement key={i} lesson={myLesson.at(i)} />)}
            </Form.Group>
          </div>

        </Form>

      </Container>

      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>

  );
};

export default Evaluation;