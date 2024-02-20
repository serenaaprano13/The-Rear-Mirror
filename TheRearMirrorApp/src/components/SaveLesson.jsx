import MyNavbar from "./MyNavbar";
import { Container, Row, Col, InputGroup, FormControl, Card, Button, Form } from 'react-bootstrap';
import Title from "./Title";
import React, { useState } from 'react';
import { Lesson } from "./lessonDefine";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import RangeSlider from 'react-bootstrap-range-slider';
import API from "./lessonsAPI";


// Calcola la data corrente qui
const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Gennaio è 0!
const year = today.getFullYear();
const currentDate = `${day}/${month}/${year}`;






function SaveLesson() {

    const [activeButtons, setActiveButtons] = useState({
        speeding: false,
        redLight: false,
        uphillStart: false,
        sParking: false,
        speedingP: false,
        redLightP: false,
        uphillStartP: false,
        sParkingP: false,
    });

    const [startDate, setStartDate] = useState(new Date());
    const [sliderValue, setSliderValue] = useState(1);
    const [sliderValue2, setSliderValue2] = useState(1);
    const [sliderValue3, setSliderValue3] = useState(1);






    const navigate = useNavigate();
    const returnBack = () => {
        navigate(-1);
    }


    const toggleButton = (button) => {
        // Trova il pulsante corrispondente
        const correspondingButton = button.endsWith('P') ? button.slice(0, -1) : button + 'P';

        // Se il pulsante corrispondente è attivo, allora possiamo attivare questo pulsante
        // indipendentemente dal numero di pulsanti attualmente attivi
        if (activeButtons[correspondingButton]) {
            setActiveButtons({
                ...activeButtons,
                [button]: true,
                [correspondingButton]: false
            });
        } else {
            // Conta il numero di pulsanti attualmente attivi
            const activeCount = Object.values(activeButtons).filter(value => value).length;

            // Se ci sono già 3 pulsanti attivi e stiamo cercando di attivare un altro pulsante,
            // allora non fare nulla
            if (activeCount >= 3 && !activeButtons[button]) {
                return;
            }

            // Attiva o disattiva il pulsante e disattiva il pulsante corrispondente
            setActiveButtons({
                ...activeButtons,
                [button]: !activeButtons[button],
                [correspondingButton]: false
            });
        }
    };

    // Creare un oggetto Lesson basato sullo stato corrente dei pulsanti
     let createLesson = async () => {
        // Find the first three active buttons for scenarios
        const scenarios = Object.entries(activeButtons)
            .filter(([key, value]) => value)
            .map(([key]) => key)
            .slice(0, 3);
    
        // Find the first three active buttons for mistakes
        const mistakes = ['speeding', 'redLight', 'uphillStart', 'sParking']
            .filter(mistake => activeButtons[mistake])
            .slice(0, 3);
    
        // Create a Lesson object
        let currentDate = new Date();
        let formattedDate = currentDate.toISOString().slice(0, 10); // This will give you the date in YYYY-MM-DD format
    
        const lesson = new Lesson();
        lesson.date = formattedDate, // Use the current date in YYYY-MM-DD format
        lesson.mistake_1 = mistakes[0] || '',
        lesson.mistake_2 = mistakes[1] || '',
        lesson.mistake_3 = mistakes[2] || '',
        lesson.scenario1 = scenarios[0] || '',
        lesson.scenario2 = scenarios[1] || '',
        lesson.scenario3 = scenarios[2] || '',
        lesson.grade = -1, // grade
        lesson.evaluated = -1, // rifEvaluation
        0, // distance
        lesson.to_evaluate = false // to_evaluate
        lesson.distance = Number(sliderValue) + Number(sliderValue2) + Number(sliderValue3);
        lesson.route_1 = document.getElementById('formBasicRoute').value
        lesson.route_2 = document.getElementById('formBasicRoute2').value
        lesson.route_3 = document.getElementById('formBasicRoute3').value
    
        // Do something with the lesson object (e.g., send it to a server or save it locally)

        //console.log("Valore passato a SaveLesson:");
        //console.log(JSON.stringify(lesson));
        await API.saveLesson(lesson).then(() => navigate('/'))
    };



    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: 'auto auto auto 1fr',
            height: '100vh'
        }}>

            <header>
                <Title titolo="Save lesson"></Title>
            </header>

            {/* INSERISCI QUI IL TITOLO 
            <Container fluid className="top-bar">
                <Row>
                    <h2>THE REAR MIRROR</h2>
                </Row>
            </Container>
            <Container fluid className="back-button-bar">
                <Row className="mb-3">
                    <Title />
                </Row>
            </Container>*/}

            <Container fluid style={{ overflowY: 'auto' }}>

                {/* INSERISCI QUI text input   */}




                <div>
                    <label style={{ marginRight: '10px' }}>Date: </label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>


                <>
                    <Form.Group controlId="formBasicRoute" className="mb-3">
                        <Form.Label>Route 1</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Enter route 1" />
                    </Form.Group>

                    <Form.Group controlId="formBasicSlider" className="mb-3">
                        <Form.Label>Route 1 distance (in km)</Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Control type="range" min="1" max="10" value={sliderValue} onChange={e => setSliderValue(e.target.value)} style={{ marginRight: '10px' }} />
                            <span>{sliderValue}</span>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicRoute2" className="mb-3">
                        <Form.Label>Route 2</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Enter route 2" />
                    </Form.Group>

                    <Form.Group controlId="formBasicSlider" className="mb-3">
                        <Form.Label>Route 2 distance (in km)</Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Control type="range" min="1" max="10" value={sliderValue2} onChange={e => setSliderValue2(e.target.value)} style={{ marginRight: '10px' }} />
                            <span>{sliderValue2}</span>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicRoute3" className="mb-3">
                        <Form.Label>Route 3</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Enter route 3" />
                    </Form.Group>

                    <Form.Group controlId="formBasicSlider" className="mb-3">
                        <Form.Label>Route 3 distance (in km)</Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Control type="range" min="1" max="10" value={sliderValue3} onChange={e => setSliderValue3(e.target.value)} style={{ marginRight: '10px' }} />
                            <span>{sliderValue3}</span>
                        </div>
                    </Form.Group>



                    <h5>Select no more than 3 elements below:</h5>

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

                    <Form.Label className="mt-3">Progresses</Form.Label>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex' }}>
                            <Button
                                variant={activeButtons.speedingP ? 'primary' : 'secondary'}
                                onClick={() => toggleButton('speedingP')}
                                style={{ flex: 1 }}
                            >
                                Speeding
                            </Button>
                            <Button
                                variant={activeButtons.redLightP ? 'primary' : 'secondary'}
                                onClick={() => toggleButton('redLightP')}
                                style={{ flex: 1 }}
                            >
                                Red light
                            </Button>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Button
                                variant={activeButtons.uphillStartP ? 'primary' : 'secondary'}
                                onClick={() => toggleButton('uphillStartP')}
                                style={{ flex: 1 }}
                            >
                                Uphill Start
                            </Button>
                            <Button
                                variant={activeButtons.sParkingP ? 'primary' : 'secondary'}
                                onClick={() => toggleButton('sParkingP')}
                                style={{ flex: 1 }}
                            >
                                S Parking
                            </Button>
                        </div>
                    </div>

                    <Row className="mt-5">
                        <Col>
                            <Button variant="secondary" className="mr-2 w-100 " onClick={returnBack}>Cancel</Button>
                        </Col>
                        <Col>
                            <Button variant="primary" className="w-100" onClick={createLesson}>Save Lesson</Button>
                        </Col>
                    </Row>
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