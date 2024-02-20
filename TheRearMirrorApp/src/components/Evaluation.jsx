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
      if ((isChecked === true) && lesson.grade <= 0)//lesson.grade <= 0 && isChecked === true
        return lesson;
      if (isChecked === false)
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
      <Container fluid className="date-keyword-bar">
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="date">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <InputGroup.Text>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 29 29" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.36251 0C8.9148 0 9.36251 0.447715 9.36251 1V2.84772H19.4963V1C19.4963 0.447716 19.944 0 20.4963 0C21.0486 0 21.4963 0.447716 21.4963 1V2.84772H21.8588C25.7248 2.84772 28.8588 5.98173 28.8588 9.84772V21.1318C28.8588 24.9978 25.7248 28.1318 21.8588 28.1318H7C3.134 28.1318 0 24.9978 0 21.1318V9.84772C0 5.98172 3.13401 2.84772 7 2.84772H7.36251V1C7.36251 0.447715 7.81023 0 8.36251 0ZM19.4963 4.84772V6.74655C19.4963 7.29883 19.944 7.74655 20.4963 7.74655C21.0486 7.74655 21.4963 7.29883 21.4963 6.74655V4.84772H21.8588C24.6202 4.84772 26.8588 7.0863 26.8588 9.84772V21.1318C26.8588 23.8933 24.6202 26.1318 21.8588 26.1318H7C4.23857 26.1318 2 23.8932 2 21.1318V9.84772C2 7.0863 4.23858 4.84772 7 4.84772H7.36251V6.74655C7.36251 7.29883 7.81023 7.74655 8.36251 7.74655C8.9148 7.74655 9.36251 7.29883 9.36251 6.74655V4.84772H19.4963ZM4.14513 12.0514C4.14513 10.9469 5.04056 10.0514 6.14513 10.0514H10.3346V10.0514H11.3346H17.5242H18.5242H22.7137C23.8183 10.0514 24.7137 10.9468 24.7137 12.0514V16.2409V17.2409V18.2409V22.4305C24.7137 23.535 23.8183 24.4305 22.7137 24.4305H18.5242H17.5242H11.3346H10.3346H6.14512C5.04054 24.4305 4.14512 23.535 4.14512 22.4305V17.2409V16.2409L4.14513 12.0514ZM16.5242 22.4305V18.2409L12.3346 18.2409V22.4305L16.5242 22.4305ZM18.5242 16.2409H22.7137L22.7137 12.0514L18.5242 12.0514L18.5242 16.2409ZM18.5242 22.4305L22.7137 22.4305V18.2409H18.5242L18.5242 22.4305ZM12.3347 12.0514H16.5242V16.2409H12.3347V12.0514V12.0514ZM10.3346 18.241L10.3346 22.4305L6.14512 22.4305V18.241H10.3346ZM10.3346 16.2409H6.14513V12.0514L10.3346 12.0514L10.3346 16.2409Z" fill="black" />
                    </svg>
                  </InputGroup.Text>
                  <DatePicker selected={startDate} onChange={handleDateChange} placeholderText="Date" className="form-control" />
                </div>
              </Form.Group>
            </Col>
            <Col>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Label className='custom-label'>Validated</Form.Label>

                <Form.Group controlId="formCheckbox">
                  <Form.Check
                    type="checkbox"
                    label=""
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
          <br /><br />
          <div style={{ display: 'flex', alignItems: 'center' }}>

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