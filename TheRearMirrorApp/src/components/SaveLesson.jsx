import MyNavbar from "./MyNavbar";
import { Container, Row, Col, InputGroup, FormControl, Card, Button, Form } from 'react-bootstrap';
import Title from "./Title";
import React, { useState } from 'react';


function SaveLesson() {

    const [activeButtons, setActiveButtons] = useState({
        speeding: false,
        redLight: false,
        uphillStart: false,
        sParking: false,
    });

    const toggleButton = (button) => {
        setActiveButtons({ ...activeButtons, [button]: !activeButtons[button] });
    };




    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: 'auto auto auto 1fr',
            height: '100vh'
        }}>
            <Container fluid className="top-bar">
                <Row>
                    <h2>THE REAR MIRROR</h2>
                </Row>
            </Container>
            <Container fluid className="back-button-bar">
                <Row className="mb-3">
                    <Title />
                </Row>
            </Container>

            <Container fluid style={{ overflowY: 'auto' }}>

                {/* INSERISCI QUI text input   */}

                <div style={{ textAlign: 'right' }}>
                    17/09/23
                </div>




                <>
                    <Form.Group controlId="formBasicRoute" className="mb-3">
                        <Form.Label>Route</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter route" />
                    </Form.Group>


                    <Form.Label className="mt-3">Mistakes</Form.Label>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
  <div style={{ display: 'flex' }}>
    <Button
      variant={activeButtons.speeding ? 'primary' : 'secondary'}
      onClick={() => toggleButton('speeding')}
      style={{ flex: 1 }}
    >
      Speeding
    </Button>
    <Button
      variant={activeButtons.redLight ? 'primary' : 'secondary'}
      onClick={() => toggleButton('redLight')}
      style={{ flex: 1 }}
    >
      Red light
    </Button>
  </div>
  <div style={{ display: 'flex' }}>
    <Button
      variant={activeButtons.uphillStart ? 'primary' : 'secondary'}
      onClick={() => toggleButton('uphillStart')}
      style={{ flex: 1 }}
    >
      Uphill Start
    </Button>
    <Button
      variant={activeButtons.sParking ? 'primary' : 'secondary'}
      onClick={() => toggleButton('sParking')}
      style={{ flex: 1 }}
    >
      S Parking
    </Button>
  </div>
</div>
                </>

                <Row style={{ height: '4rem' }}>
                </Row>
                <Row>
                    <MyNavbar />
                </Row>
            </Container>
        </div>
    )
}

export { SaveLesson };