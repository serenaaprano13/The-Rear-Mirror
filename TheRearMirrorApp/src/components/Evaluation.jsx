//shift alt f autoindent


import React from 'react';
import MyNavbar from './MyNavbar';
import Title from './Title';
import { Form, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Container from 'react-bootstrap/Container';
import { Lesson } from '../../server/lessonDefine';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

const myLesson = [];
myLesson.push(new Lesson('2023-02-15', "Uphill Start", 'Nightime', 'S-Park', 4, true, 5));
myLesson.push(new Lesson('2023-02-16', "Red Light", 'Roundabout', 'Speeding', 5, true, 4));
myLesson.push(new Lesson('2023-02-14', "Red Light", 'Roundabout', 'Speeding', -1, false, 6));


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
              <Form.Group controlId="duedate">
              <Form.Label className='custom-label'>Date</Form.Label>
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
            <Form.Label className='custom-label'>Validated</Form.Label>
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


function LessonElement(wrap) {
  const lesson = wrap.lesson;
  const bToEvaluate = lesson.evaluated;
  
  const navigate = useNavigate();
  const handleEvaluate = () => {
    navigate('/evaluating');
  };
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
            <Col >{lesson.scenario1}</Col>
            <Col ></Col>
          </Row>
          <Row>
            <Col >{lesson.scenario2}</Col>
            <Col >Grade</Col>
          </Row>
          <Row>
            <Col >{lesson.scenario3}</Col>
            <Col >
              {Array.from({ length: lesson.grade }, (_, key) => (
                <FontAwesomeIcon icon={faStar} size="1x" key={key} />
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
            <Col >{lesson.scenario1}</Col>
            <Col ></Col>
          </Row>
          <Row>
            <Col >{lesson.scenario2}</Col>
            <Col ></Col>
          </Row>
          <Row>
            <Col >{lesson.scenario3}</Col>
            <Col >
              <Form.Group className="d-flex justify-content-center ">
                <button className="save-btn" onClick={(event) => handleEvaluate(event)}>EVALUATE</button>
              </Form.Group>
            </Col>
          </Row>

        </Container>
        <br />
      </div>
    </div>
  }
}
export default Evaluation;