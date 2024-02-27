//shift alt f autoindent


import React from 'react';
import MyNavbar from './MyNavbar';
import Title from './Title';
import { Form } from 'react-bootstrap';
import { Row, Col, InputGroup, FormControl, Card, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Container from 'react-bootstrap/Container';
//import { Lesson } from '../../server/lessonDefine';
import { Lesson } from './lessonDefine';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from 'react-bootstrap/Modal';
import { faCalendarAlt, faStar, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import API from "./lessonsAPI";
import DatePicker from "react-datepicker";



const errorMessageStyle = {
  color: 'red',
  fontSize: '18px',
  marginTop: '10px',
};


const DisplayErrorMessage = ({ lessons }) => {
  const errorMessage = "No lessons available.";

  if (!lessons || lessons.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px', ...errorMessageStyle }}>
        <p>{errorMessage}</p>
      </div>
    );
  }

};
//-----------------------------------------------------------------------
const Evaluation = () => {

  const [showModalPin, setShowModalPin] = useState(false);
  const navigate = useNavigate();
  const handlePinSubmit = () => {
    // Here you can get the pin value from the form and validate it
    // For example, let's just log it to the console for now
    console.log("Pin submitted");
    localStorage.setItem('pinModalShown', 'true');
    // Close the modal after submitting
    setShowModalPin(false);
  };
  
  useEffect(() => {
    // Check if the modal has been shown before
    const hasModalBeenShown = localStorage.getItem('pinModalShown');
    console.log("pinModalShown: " + hasModalBeenShown)
    localStorage.setItem('pinModalShown', 'false');
    if (!hasModalBeenShown) {
      // If not, show the modal and set the flag in localStorage
      setShowModalPin(true);

    }
  }, []);

  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked === true) {
      const filteredLessons = lessons.filter(lesson => {
        if ((lesson.grade <= 0 && isChecked === true))
          return lesson;

      });
      setLessons(filteredLessons);
    }
    else
      fetchAllLessons();
  }

  const [startDate, setStartDate] = useState(null);

  const [lessons, setLessons] = useState([]);
  // Fetch all lessons at the beginning
  
  useEffect(() => {
    fetchAllLessons();
  }, []);


  // Function to fetch all lessons
  const fetchAllLessons = () => {
    API.getAllLessons()
      .then(lessonsTemp => {
        setLessons(lessonsTemp);
        console.log(lessonsTemp);
      });
  };

  const handleDateChange = (date) => {
    setStartDate(date);

    const filteredLessons = lessons.filter(lesson => {
      const lessonDate = new Date(lesson.date);
      return lessonDate.getDate() === date.getDate() &&
        lessonDate.getMonth() === date.getMonth() &&
        lessonDate.getFullYear() === date.getFullYear();

    });

    setLessons(filteredLessons);
  }

  return (

    <div style={{
      display: 'grid',
      gridTemplateRows: 'auto auto auto 1fr',
      height: '100vh'
    }}>

      <header>
        <Title titolo="Evaluations"></Title>
      </header>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="date">

                <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ marginRight: '10px' }} />
                <Form.Label className='custom-label'>Date</Form.Label>
                <DatePicker selected={startDate} onChange={handleDateChange} placeholderText="Date" className="form-control" />

              </Form.Group>
            </Col>
            <Col>
              <Form.Label className='custom-label'>Validated</Form.Label>
              <Form.Group controlId="formCheckbox">
                <div style={{ display: "flex" }}>

                  <Form.Check
                    type="checkbox"
                    label=""
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    style={{ transform: 'scale(3)', marginLeft: '50px', marginTop: '10px' }}
                    alignright="true"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <br /><br />
          <div >
            <Form.Group controlId="LessonElements">
              {lessons.length === 0 ? (
                <DisplayErrorMessage />
              ) : (
                lessons.map((a, i) => <LessonElement key={i} lesson={a} index={i} />)
              )}
            </Form.Group>
            <div>
              {lessons.map((lesson, index) => (
                <p key={index}>{lesson.id}</p>
              ))}
            </div>
          </div>
        </Form>
      </Container>
      <Modal show={showModalPin} onHide={() => setShowModalPin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Pin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPin">
              <Form.Label>Pin</Form.Label>
              <Form.Control type="password" placeholder="Enter pin" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondaryPin" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="primaryPin" onClick={handlePinSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>
    </div>
  );
};


function LessonElement(wrap, index) {
  const lesson = wrap.lesson;
  const id = parseInt(index, 10);

  const grade = lesson.grade;

  const navigate = useNavigate();
  const handleEvaluate = (e, id) => {
    e.preventDefault();
    navigate('/evaluating', { state: { lesson } });
  };
  const handleDropdownSelect = (eventKey) => {
    if (eventKey === 'delete') {
      // Handle delete logic here, e.g., call a delete function

      setShowDiscardModal(true);
    }
  };

  const [showDiscardModal, setShowDiscardModal] = useState(false);//modal conferma delete grade
  const confirmDiscard = () => {
    API.insertEval(lesson.date, -1).catch(e => console.error('reset insertEval error:', e));
    setShowDiscardModal(false);
    window.location.reload();
  };
  const cancelDiscard = () => {
    setShowDiscardModal(false);
  };


  if (lesson.grade > 0) {
    return <div>
      <div >
        <Card key={index} className="w-100">
          <Card.Header style={{ fontWeight: 'bold' }}>
            <div className="d-flex align-items-center" style={{ display: "flex" }}>
              LESSON {lesson.date}

              <DropdownButton
                style={{ marginLeft: "auto" }}
                variant="secondary"
                title={<FontAwesomeIcon icon={faEllipsisV} />}
                id={`dropdown-button-${index}`}
                onSelect={handleDropdownSelect}
              >
                <Dropdown.Item eventKey="delete">Delete Evaluation</Dropdown.Item>
              </DropdownButton>

            </div>

          </Card.Header>
          <Card.Body className="d-flex align-items-center">
            <div>
              <Card.Text>{lesson.scenario1}</Card.Text>
              <Card.Text>{lesson.scenario2}</Card.Text>
              <Card.Text>{lesson.scenario3}</Card.Text>
            </div>
            <div className="ml-auto">
              {lesson.grade !== -1 ? (
                Array.from({ length: lesson.grade }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} size="1x" />
                ))
              ) : (
                <button className="save-btn" onClick={(event) => handleEvaluate(event, lesson)}>
                  EVALUATE
                </button>
              )}
            </div>
          </Card.Body>
        </Card>

        <br />
      </div>

      <Modal show={showDiscardModal} onHide={cancelDiscard}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this grade?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDiscard}>Cancel</Button>
          <Button variant="primary" onClick={confirmDiscard}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>

  }
  else {
    return <div>
      <div >
        <Card key={index} className="w-100">
          <Card.Header style={{ fontWeight: 'bold' }}>
            <div className="d-flex align-items-center" style={{ display: "flex" }}>
              LESSON {lesson.date}
            </div>

          </Card.Header>
          <Card.Body className="d-flex align-items-center">
            <div>
              <Card.Text>{lesson.scenario1}</Card.Text>
              <Card.Text>{lesson.scenario2}</Card.Text>
              <Card.Text>{lesson.scenario3}</Card.Text>
            </div>
            <div className="ml-auto">
              {lesson.grade !== -1 ? (
                Array.from({ length: lesson.grade }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} size="1x" />
                ))
              ) : (
                <button className="save-btn" onClick={(event) => handleEvaluate(event, lesson)}>
                  EVALUATE
                </button>
              )}
            </div>
          </Card.Body>
        </Card>

        <br />
      </div>

      <Modal show={showDiscardModal} onHide={cancelDiscard}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Grade</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to assign this grade?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDiscard}>Cancel</Button>
          <Button variant="primary" onClick={confirmDiscard}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
}
export default Evaluation;