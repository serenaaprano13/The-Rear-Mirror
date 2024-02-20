import MyNavbar from "./MyNavbar";
import { Container, Row, Col, InputGroup, FormControl, Card, Button } from 'react-bootstrap';
import Title from "./Title";
import './LookBack.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Lesson } from "./lessonDefine";
import API from "./lessonsAPI";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function LookBack() {

  const [lessons, setLessons] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [key, setKey] = useState(Math.random());




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
  }, [key]);


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

  const handleEvaluateClick = async (lesson) => {
    console.log("handleEvaluateClick called with lesson:", lesson);
    await API.updateLesson(lesson.date);
    const updatedLessons = await API.getAllLessons();
    setLessons([...updatedLessons]);
    console.log(lessons);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateRows: 'auto auto auto 1fr',
      height: '100vh'
    }}>

      <header>
        <Title titolo="Look Back"></Title>
      </header>
      {/* <Container fluid className="top-bar">
        <Row>
          <h2>THE REAR MIRROR</h2>
        </Row>
      </Container> 
      <Container fluid className="back-button-bar">
        <Row className="mb-3">
          
        </Row>
      </Container>*/}
      <Container fluid className="date-keyword-bar">
        <Row>
          <Col>
            <InputGroup>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputGroup.Text>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 29 29" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.36251 0C8.9148 0 9.36251 0.447715 9.36251 1V2.84772H19.4963V1C19.4963 0.447716 19.944 0 20.4963 0C21.0486 0 21.4963 0.447716 21.4963 1V2.84772H21.8588C25.7248 2.84772 28.8588 5.98173 28.8588 9.84772V21.1318C28.8588 24.9978 25.7248 28.1318 21.8588 28.1318H7C3.134 28.1318 0 24.9978 0 21.1318V9.84772C0 5.98172 3.13401 2.84772 7 2.84772H7.36251V1C7.36251 0.447715 7.81023 0 8.36251 0ZM19.4963 4.84772V6.74655C19.4963 7.29883 19.944 7.74655 20.4963 7.74655C21.0486 7.74655 21.4963 7.29883 21.4963 6.74655V4.84772H21.8588C24.6202 4.84772 26.8588 7.0863 26.8588 9.84772V21.1318C26.8588 23.8933 24.6202 26.1318 21.8588 26.1318H7C4.23857 26.1318 2 23.8932 2 21.1318V9.84772C2 7.0863 4.23858 4.84772 7 4.84772H7.36251V6.74655C7.36251 7.29883 7.81023 7.74655 8.36251 7.74655C8.9148 7.74655 9.36251 7.29883 9.36251 6.74655V4.84772H19.4963ZM4.14513 12.0514C4.14513 10.9469 5.04056 10.0514 6.14513 10.0514H10.3346V10.0514H11.3346H17.5242H18.5242H22.7137C23.8183 10.0514 24.7137 10.9468 24.7137 12.0514V16.2409V17.2409V18.2409V22.4305C24.7137 23.535 23.8183 24.4305 22.7137 24.4305H18.5242H17.5242H11.3346H10.3346H6.14512C5.04054 24.4305 4.14512 23.535 4.14512 22.4305V17.2409V16.2409L4.14513 12.0514ZM16.5242 22.4305V18.2409L12.3346 18.2409V22.4305L16.5242 22.4305ZM18.5242 16.2409H22.7137L22.7137 12.0514L18.5242 12.0514L18.5242 16.2409ZM18.5242 22.4305L22.7137 22.4305V18.2409H18.5242L18.5242 22.4305ZM12.3347 12.0514H16.5242V16.2409H12.3347V12.0514V12.0514ZM10.3346 18.241L10.3346 22.4305L6.14512 22.4305V18.241H10.3346ZM10.3346 16.2409H6.14513V12.0514L10.3346 12.0514L10.3346 16.2409Z" fill="black" />
                  </svg>
                </InputGroup.Text>
                <DatePicker selected={startDate} onChange={handleDateChange} placeholderText="Date" className="form-control" />
              </div>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <FormControl type="text" placeholder="Keyword" aria-label="keyword" />
              <InputGroup.Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container key={key} fluid style={{ overflowY: 'auto' }}>
  <Row>
    {lessons.map((lesson, index) => (
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
              lesson.to_evaluate === 1 ? (
                <span>waiting for evaluation</span>
              ) : (
                <Button variant="primary" onClick={() => handleEvaluateClick(lesson)}>
                  ask to evaluate
                </Button>
              )
            )}
          </div>
        </Card.Body>
      </Card>
    ))}
  </Row>
  {lessons.length === 0 && (
    <Row>
      <Col className="d-flex justify-content-center">
        <p>No lessons matching your requirements</p>
      </Col>
    </Row>
  )}
  {startDate && (
    <Row>
      <Col className="d-flex justify-content-center">
        <Button variant="primary" onClick={fetchAllLessons}>Show all lessons</Button>
      </Col>
    </Row>
  )}
  <Row style={{ height: '4rem' }}></Row>
  <Row>
    <MyNavbar />
  </Row>
</Container>
    </div>
  )
}

export { LookBack };