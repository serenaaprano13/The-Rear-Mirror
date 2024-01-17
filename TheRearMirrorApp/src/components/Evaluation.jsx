//shift alt f autoindent


import React from 'react';
import MyNavbar from './MyNavbar';
import Title from './Title';
import { Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Evaluation = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [date, setDate] = useState(new Date());


  return (

    <div>
      <header>
        <Title titolo="Evaluations"></Title>
      </header>
      <Container>
        <Form>
          <div>

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