//shift alt f autoindent


import React from 'react';
import MyNavbar from './MyNavbar';
import Title from './Title';
import { Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import Col from 'react-bootstrap/Col';

const Evaluation = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (

    <div>
      <header>
        <Title titolo="Evaluations"></Title>
      </header>
      <Form>

        <Col md={6}>
          <Col>
            <Form.Group controlId="datePicker">
              <Form.Label className='fw-light'>Date Picker</Form.Label>
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
        </Col>

      </Form>







      <footer className="myNavbar">
        <MyNavbar></MyNavbar>
      </footer>

    </div>







  );
};

export default Evaluation;