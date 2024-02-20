//shift alt f autoindent


import React from 'react';
import MyNavbar from './MyNavbar';
import Title from './Title';
import { Form, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Container from 'react-bootstrap/Container';
//import { Lesson } from '../../server/lessonDefine';
import { Lesson } from './lessonDefine';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// myLesson.push(new Lesson('2023-02-15', "Uphill Start", 'Nightime', 'S-Park', 4, true, 5));
// myLesson.push(new Lesson('2023-02-16', "Red Light", 'Roundabout', 'Speeding', 5, true, 4));
// myLesson.push(new Lesson(1,'2023-02-14', "Red Light", 'Roundabout', 'Speeding', -1, false, 6));





/*const APIURL = 'http://localhost:3000/api'
async function getLessonsToEvaluate(validated,date) {

  const apiUrl = APIURL + '/getLessonsToEvaluate';

  // Create a URLSearchParams object to handle query parameters
  const params = new URLSearchParams();
  params.append('validated', validated);
  params.append('date', date.toISOString().split('T')[0]);//formatta come piace a sqlite);

  // Append the parameters to the URL
  const urlWithParams = apiUrl + '?' + params.toString();
  
  const response = await fetch(urlWithParams);
  // const response = await fetch(urlWithParams);
  if (response.status !== 200 && response.status !== 304) return [];
  const lessonsJson = await response.json();
  return lessonsJson.map((l) => ({id: l.id, date: l.date, scenario1: l.scenario1, scenario2: l.scenario2,
       scenario3: l.scenario3, grade: l.grade, evaluated: l.evaluated, distance: l.distance, to_evaluate: l.to_evaluate  }) )
}


*/


function getFirstToEvaluate(validated,date)
{
  return  (new Lesson('2023-02-15', "Uphill Start", 'Nightime', 'S-Park', 4, true, 5)) 
}

//-----------------------------------------------------------------------
const Evaluation = () => {
  const [isChecked, setIsChecked] = useState(false);
  const[lessons, setLessons] = useState([]);

  useEffect(() => {
    getLessonsToEvaluate(true, new Date())
      .then(lessons => {
        setLessons(lessons);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);




  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [date, setDate] = useState(new Date());

  
  //All'inizio carico le lezioni nell'array lezioni
  // useEffect(() => {
  //   getFirstToEvaluate(isChecked,date)
  //     .then(myLesson => setLessons(myLesson))
  // }, []);

  /*useEffect(() => {
    getLessonsToEvaluate(isChecked,date)
      .then(myLesson => setLessons(myLesson))
  }, []); */

  // const [lessons, setLessons] = useState([]);

  // //All'inizio carico le lezioni nell'array lezioni
  // useEffect(() => {
  //   getAllLessons()
  //     .then(lessons => setLessons(lessons))
  //    // .catch(() => { setMessage('errore nella comunicazione col database'); setshowMessage(true) })
  // }, []);
  
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
                <Form.Control
                  type="date"
                  name="date"
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
           {/* <Form.Group controlId="LessonElements">
              {myLesson.map((a, i) => <LessonElement key={i} lesson={myLesson.at(i)} />)}
            </Form.Group>*/}
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


function LessonElement(wrap) {
  const lesson = wrap.lesson;
  const grade = lesson.grade;

  const navigate = useNavigate();
  const handleEvaluate = (e, id) => {
    navigate('/evaluating?l=' + id);
  };
  if (grade>0) {
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
                <button className="save-btn" onClick={(event) => handleEvaluate(event, lesson.id)}>EVALUATE</button>
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