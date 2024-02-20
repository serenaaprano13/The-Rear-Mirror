//shift alt f autoindent


import React from 'react';
import MyNavbar from './MyNavbar';
import Title from './Title';
import { Form, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Container from 'react-bootstrap/Container';
import { Lesson, Route } from './lessonDefine';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const myLesson = [];
//id, date, scenario1, scenario2, scenario3, grade, rifEvaluation, distance, to_evaluate
myLesson.push(new Lesson(1, '2023-02-14', "Red Light", 'Roundabout', 'Speeding', -1, -1, 6, true));
const mistakes = [];
mistakes.push(("Roundabout"))
mistakes.push(("Speeding"))
mistakes.push(("Lights off"))
const scenarios = [];
scenarios.push(("Uphill Start"));
scenarios.push(("S Parking"));
scenarios.push(("Nightime Driving"));
const routes = [];
routes.push(new Route("Corso Ferrucci", 3));
routes.push(new Route("Corso Trapani", 2));
routes.push(new Route("Via Virle", 1));


const StarRating = ({ rating, onRatingChange }) => {
  const maxRating = 5;

  const handleStarClick = (clickedRating) => {
    onRatingChange(clickedRating);
  };

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          size="2x"
          style={{ color: index < rating ? 'black' : 'grey', cursor: 'pointer' }}
          onClick={() => handleStarClick(index + 1)}
        />
      ))}
    </div>
  );
};

const handleDistanceChange = (e) => {
  // Handle the distance value here
  console.log(e.target.value);
};


const Evaluating = () => {
  const location = useLocation();
  const lesson = location.state.lesson;
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const navigate = useNavigate();

  const APIURL = 'http://localhost:3000/api'
  async function Save() {
    const response = await fetch(APIURL + '/insertEvaluation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lesson.date, rating)
    });
  }
  const handleSave = () => {
    Save()

    // navigate('/Evaluation');
  };

  const initialDistance = lesson.distance;
  console.log(initialDistance)
  const [date, setDate] = useState(new Date());
  const dateStr = lesson.date;
  const [inputValue, setInputValue] = useState(initialDistance);
  return (

    <div>
      <header>
        <Title titolo="Evaluating"></Title>
      </header>
      <div className="scroll-container">
        <Container>
          <Row>
            <Col>

              <Form.Label className='custom-label'>Distance</Form.Label>
            </Col>

            <Col>
              <FontAwesomeIcon icon={faCalendarAlt} size="1x" />
              <Form.Label className='custom-label'> Date</Form.Label>

            </Col>
          </Row>

          <Row>

            <Col>
              <Form.Group controlId="distance">
                <Form.Control
                  type="number"
                  name="distance"
                  placeholder="Enter distance"
                  defaultValue={inputValue}
                  onChange={handleDistanceChange}
                />
              </Form.Group>
            </Col>
            <Form.Group controlId="duedate">
              <input type="text" value={dateStr} readOnly />
            </Form.Group>
          </Row>

          <Row>
            <Col>
              <Form.Label className='custom-label'>Route</Form.Label>
            </Col>
          </Row>
          <Row >
            <div className="evaluating-element">
              <Row>
                {lesson.route_1}
              </Row>
              <Row>
                {lesson.route_2}
              </Row>
              <Row>
                {lesson.route_3}
              </Row>
            </div>
          </Row>
          <Row>
            <Col>
              <Form.Label className='custom-label'>Driving Scenarios</Form.Label>
            </Col>
          </Row>
          <Row>
            <div className="evaluating-element">
              <Row >{lesson.scenario1}</Row>
              <Row>{lesson.scenario2}</Row>
              <Row>{lesson.scenario3}</Row>
            </div>
          </Row>
          <Row>
            <Col>

              <Form.Label className='custom-label'>Mistakes</Form.Label>
            </Col>
          </Row>
          <Row>
            <div className="evaluating-element">
              <Row>{lesson.mistake_1}</Row>
              <Row>{lesson.mistake_2}</Row>
              <Row>{lesson.mistake_3}</Row>
            </div>
          </Row>
          <Row>
            <Col>

              <Form.Label className='custom-label'>Grade</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <StarRating rating={rating} onRatingChange={handleRatingChange} />
            </Col>
          </Row>
          <Form.Group className="d-flex justify-content-center ">
            <button className="save-btn" onClick={(event) => handleSave(event)}>CONFIRM</button>
          </Form.Group>
        </Container>
      </div>
      <br /><br /><br /><br />
      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>

  );
};

export default Evaluating;