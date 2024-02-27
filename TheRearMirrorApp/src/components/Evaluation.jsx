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
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import DatePicker from "react-datepicker";



const errorMessageStyle = {
  color: 'grey',
  fontSize: '18px',
  marginTop: '10px',
};


const DisplayErrorMessage = ({ lessons }) => {
  const errorMessage = "Loading lessons...This might take a few seconds. Please wait.";

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
  const navigate = useNavigate();


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

     
        <Title titolo="Evaluations"></Title>
      
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="date">

                <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ marginRight: '10px' }} />
                <Form.Label className='custom-label'>DATE</Form.Label>
                <DatePicker selected={startDate} onChange={handleDateChange} placeholderText="Date" className="form-control" />

              </Form.Group>
            </Col>
            <Col>
              <Form.Label className='custom-label'>VALIDATED</Form.Label>
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

    setShowModalPin(true);

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


  const [password, setPassword] = useState('');
  const [showModalPin, setShowModalPin] = useState(false);
  const handlePinSubmit = () => {
    if (password.trim() === '') {
      console.log('Password is empty!');
      alert("TheRearMirror:\nYour Password cannot be empty!")
    }
    else {
      console.log("Pin submitted");
      localStorage.setItem('pinModalShown', 'true');
      // Close the modal after submitting
      setShowModalPin(false);
      navigate('/evaluating', { state: { lesson } });
    }
  };


  if (lesson.grade > 0) {
    return <div>
      <div >
        <Card key={index} className="w-100">
          <Card.Header style={{ fontWeight: 'bold' }}>
            <div className="d-flex align-items-center" style={{ display: "flex" }}>
              LESSON {lesson.date}

              <DropdownButton 
                className="evaluation-dropdown"
                style={{marginLeft: 'auto', backgroundColor:'#C0C0C0 !important', border: 'none'}}
                variant="secondary"
                title={<FontAwesomeIcon icon={faEllipsisV} style={{ color: 'grey' }} />}
                id={`dropdown-button-${index}`}
                onSelect={handleDropdownSelect}
              >
                <Dropdown.Item eventKey="delete" style={{ color: 'rgb(230, 65, 65)'}}>
                <FontAwesomeIcon icon={faTrash} style={{ color: 'rgb(230, 65, 65)', marginRight: '5px' }} />
                  Delete evaluation</Dropdown.Item>
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
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this grade?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDiscard}>GO BACK</Button>
          <Button variant="primary" onClick={confirmDiscard}>CONFIRM DELETION</Button>
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
      <Modal show={showModalPin} onHide={() => setShowModalPin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Pin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPin">
              <Form.Label>Pin</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter pin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondaryPin" onClick={() => setShowModalPin(false)}>
            Back
          </Button>
          <Button variant="primaryPin" onClick={handlePinSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
}
export default Evaluation;