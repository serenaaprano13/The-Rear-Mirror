import MyNavbar from "./MyNavbar";
import { Container, Row, Col, InputGroup, FormControl, Card, Button, Form } from 'react-bootstrap';
import Title from "./Title";
import React, { useState } from 'react';
import { Lesson } from "./lessonDefine";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';



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
    const createLesson = () => {
        // Trova i primi tre pulsanti attivati
        const scenarios = Object.entries(activeButtons)
            .filter(([key, value]) => value)
            .map(([key]) => key)
            .slice(0, 3);

        // Crea un oggetto Lesson
        let currentDate = new Date();
        let formattedDate = currentDate.toISOString().slice(0, 10); // This will give you the date in YYYY-MM-DD format

        const lesson = new Lesson();
        lesson.date = formattedDate, // Usa la data corrente nel formato YYYY-MM-DD
            lesson.scenario1 = scenarios[0],
            lesson.scenario2 = scenarios[1],
            lesson.scenario3 = scenarios[2],
            lesson.grade = -1, // grade
            lesson.evaluated = -1, // rifEvaluation
            0, // distance
            lesson.to_evaluate = false // to_evaluate


        // Fai qualcosa con l'oggetto lesson (ad esempio, invialo a un server o salvalo in locale)
        console.log(lesson);
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
                        <Form.Label>Route</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter route" />
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