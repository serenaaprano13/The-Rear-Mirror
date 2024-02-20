//shift alt f autoindent


import React from 'react';
import MyNavbar from './MyNavbar';
import Title from './Title';
import { Form } from 'react-bootstrap';
import { Row, Col, InputGroup, FormControl, Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Container from 'react-bootstrap/Container';
//import { Lesson } from '../../server/lessonDefine';
import { Lesson } from './lessonDefine';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import API from "./lessonsAPI";

import DatePicker from "react-datepicker";
// myLesson.push(new Lesson('2023-02-15', "Uphill Start", 'Nightime', 'S-Park', 4, true, 5));
// myLesson.push(new Lesson('2023-02-16', "Red Light", 'Roundabout', 'Speeding', 5, true, 4));
// myLesson.push(new Lesson(1,'2023-02-14', "Red Light", 'Roundabout', 'Speeding', -1, false, 6));




//-----------------------------------------------------------------------
const Evaluation = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    const filteredLessons = lessons.filter(lesson => {
      if ((lesson.grade <= 0 && isChecked === true) || (isChecked === false))
        return lesson;

    });
    setLessons(filteredLessons);
  }

  const [lessons, setLessons] = useState([]);
  const [startDate, setStartDate] = useState(null);



  // Function to fetch all lessons
  const fetchAllLessons = () => {
    API.getAllLessons()
      .then(lessons => {
        setLessons(lessons);
        console.log(lessons);
      });
  };

  // Fetch all lessons at the beginning
  useEffect(() => {
    fetchAllLessons();
  }, []);


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

    <div>
      <header>
        <Title titolo="Evaluations"></Title>
      </header>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="date">
                <Form.Label className='custom-label'>Date</Form.Label>
                <DatePicker selected={startDate} onChange={handleDateChange} placeholderText="Date" className="form-control" />

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
              {lessons.map((a, i) => <LessonElement key={i} lesson={a} index={i} />)}
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
  console.log(wrap)
  const grade = lesson.grade;

  const navigate = useNavigate();
  const handleEvaluate = (e, id) => {
    e.preventDefault();
    navigate('/evaluating', { state: { lesson } });
  };

  return <div>
    <div className="scroll-element">
      <Card key={index} className="w-100">
        <Card.Header style={{ fontWeight: 'bold' }}>LESSON {lesson.date}</Card.Header>
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
  </div>

}
export default Evaluation;