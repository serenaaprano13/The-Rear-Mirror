//shift alt f autoindent


import React from 'react';
import MyNavbar from './MyNavbar';
import Title from './Title';
import { Form, Row } from 'react-bootstrap';
import { InputGroup, FormControl, Card } from 'react-bootstrap';
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
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import API from "./lessonsAPI";


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

  const [showErrorModal, setShowErrorModal] = useState(false);//Modal grade non valido
  const handleDiscard = (event) => {
    event.preventDefault();
    if (rating > 0 && rating < 6) {
      setShowDiscardModal(true);
    }
    else {

      setShowErrorModal(true);
    }
  }

  const cancelError = () => {
    setShowErrorModal(false);
  };
  const [showDiscardModal, setShowDiscardModal] = useState(false);//modal conferma grade
  const [showDiscardModal1, setShowDiscardModal1]=useState(false);
  const confirmDiscard = () => {
    handleSave()
  };
  const cancelDiscard = () => {
    setShowDiscardModal(false);

  };
  const handleDiscard1 = (event) => {
    event.preventDefault();
    setShowDiscardModal1(true);
  }
  const confirmDiscard1 = () => {
    setShowDiscardModal(false);
    navigate('/evaluation');
  };
  const cancelDiscard1 = () => {
    setShowDiscardModal1(false);
  };

  const location = useLocation();
  const lesson = location.state.lesson;
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const navigate = useNavigate();

  const APIURL = 'http://localhost:3000/api'

  const handleSave = () => {
    if (rating > 0 && rating < 7) {
      API.insertEval(lesson.date, rating).catch(e => console.error('insertEval error:', e));
      navigate('/Evaluation');
    }
    else {
      console.log("RATING"+rating)
      window.alert('You need to insert a Grade to proceed.');
    }
  };
  const initialDistance = lesson.distance;
  console.log(initialDistance)
  const [date, setDate] = useState(new Date());
  const dateStr = lesson.date;
  const [inputValue, setInputValue] = useState(initialDistance);
  return (

    <div>
      
        <Title titolo="Evaluating"></Title>
      
      <div >
        <Container>
          <Row>
            <Col>

              <Form.Label className='custom-label'>DISTANCE</Form.Label>
            </Col>

            <Col>
              <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ marginRight: '10px' }} />
              <Form.Label className='custom-label'> DATE</Form.Label>

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
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="duedate">
                <Form.Control
                  type="text"
                  name="distance"
                  placeholder="Enter distance"
                  value={dateStr}  // Set the value using the stringValue variable
                  onChange={handleDistanceChange}
                  readOnly
                />
              </Form.Group>
            </Col>

          </Row>

          <Row>
            <Col>
              <Form.Label className='custom-label'>ROUTE</Form.Label>
            </Col>
          </Row>
          <Row >
            <Card key={1} className="w-100">

              <Card.Body className="d-flex align-items-center">
                <div>
                  <Card.Text>{lesson.route_1}</Card.Text>
                  <Card.Text>{lesson.route_2}</Card.Text>
                  <Card.Text>{lesson.route_3}</Card.Text>
                </div>
              </Card.Body>
            </Card>

          </Row>
          <Row>
            <Col>
              <Form.Label className='custom-label'>DRIVING SCENARIOS</Form.Label>
            </Col>
          </Row>

          <Row>
            <Card key={2} className="w-100">

              <Card.Body className="d-flex align-items-center">
                <div>
                  <Card.Text>{lesson.scenario1}</Card.Text>
                  <Card.Text>{lesson.scenario2}</Card.Text>
                  <Card.Text>{lesson.scenario3}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Col>
              <Form.Label className='custom-label'>MISTAKES</Form.Label>
            </Col>
          </Row>
          <Row>
            <Card key={3} className="w-100">

              <Card.Body className="d-flex align-items-center">
                <div>
                  <Card.Text>{lesson.mistake_1}</Card.Text>
                  <Card.Text>{lesson.mistake_2}</Card.Text>
                  <Card.Text>{lesson.mistake_3}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Col>

              <Form.Label className='custom-label'>GRADE</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <StarRating rating={rating} onRatingChange={handleRatingChange} />
            </Col>
          </Row>
          <Form.Group className="d-flex justify-content-center ">
          <button className="discard-btn" onClick={(event)=>handleDiscard1(event)}>DISCARD PLAN</button>{" "}
            <button className="save-btn" onClick={(event) => handleDiscard(event)}>SAVE GRADE</button>
          </Form.Group>
        </Container>
      </div>

      <Modal show={showDiscardModal} onHide={cancelDiscard}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to assign this grade?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDiscard}>CANCEL GRADE</Button>
          <Button variant="primary" onClick={confirmDiscard}>CONFIRM GRADE</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showErrorModal} onHide={cancelError}>
        <Modal.Header closeButton>
          <Modal.Title>Grade Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to insert a Grade to proceed.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelError}>OK</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDiscardModal1} onHide={cancelDiscard1}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Discard</Modal.Title>
        </Modal.Header>
      <Modal.Body>Are you sure you want to discard your changes in the evaluation?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDiscard1}>GO BACK</Button>
          <Button variant="primary" onClick={confirmDiscard1}>DISCARD GRADE</Button>
        </Modal.Footer>
    </Modal>



      <br /><br /><br /><br />
      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>

  );
};

export default Evaluating;