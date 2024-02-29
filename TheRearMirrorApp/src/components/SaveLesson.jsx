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
import Modal from 'react-bootstrap/Modal';
import Multiselect from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



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
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [recentMistakes, setRecentMistakes] = useState([]);
    const [untestedScenarios, setUntestedScenarios] = useState([]);
    const [recentMistakesError, setRecentMistakesError] = useState(false);
    const [untestedScenariosError, setUntestedScenariosError] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);




    const openSaveModal = () => setShowSaveModal(true);
    const closeSaveModal = () => setShowSaveModal(false);





    const navigate = useNavigate();

    const handleDiscard = (event) => {
        event.preventDefault();
        setShowDiscardModal(true);
    }
    const confirmDiscard = () => {
        setShowDiscardModal(false);
        navigate('/');
    };
    const cancelDiscard = () => {
        setShowDiscardModal(false);
    };


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
            lesson.mistake_1 = recentMistakes[0]?.name || '',
            lesson.mistake_2 = recentMistakes[1]?.name || '',
            lesson.mistake_3 = recentMistakes[2]?.name || '',
            lesson.scenario1 = untestedScenarios[0]?.name || '',
            lesson.scenario2 = untestedScenarios[1]?.name || '',
            lesson.scenario3 = untestedScenarios[2]?.name || '',
            lesson.grade = -1, // grade
            lesson.evaluated = -1, // rifEvaluation
            0, // distance
            lesson.to_evaluate = false // to_evaluate
        lesson.distance = Number(sliderValue);
        lesson.route_1 = document.getElementById('form-group1').value;
<<<<<<< HEAD

=======
        
>>>>>>> 8347eeee6551980192d7fee438a45d963c09033f

        // Do something with the lesson object (e.g., send it to a server or save it locally)

        //console.log("Valore passato a SaveLesson:");
        //console.log(JSON.stringify(lesson));
<<<<<<< HEAD
        await API.saveLesson(lesson)
            .then(() => {
                toast.success("Lesson saved successfully", {
                    position: "top-center",
                    autoClose: 1500,
                    onClose: () => navigate('/lookback')
                });
            })
=======
        await API.saveLesson(lesson).then(() => navigate('/lookback'))
>>>>>>> 8347eeee6551980192d7fee438a45d963c09033f
    };


    const recentMistakeOption = [
        {
            name: "Parallel Parking",
            showing: true,
        },
        {
            name: "Three-Point Turn",
            showing: true,
        },
        {
            name: "Lane Change",
            showing: true,
        },
        {
            name: "Merge onto Highway",
            showing: true,
        },
        {
            name: "U-Turn",
            showing: true,
        },
        {
            name: "Stop",
            showing: true,
        },
        {
            name: "Roundabout",
            showing: true,
        },
        {
            name: "S-Parking",
            showing: true,
        },
        {
            name: "Speed limit",
            showing: true,
        },
        {
            name: "Yield to Pedestrians",
            showing: true,
        },
        {
            name: "Emergency Stop",
            showing: true,
        },
        {
            name: "Obey Traffic Signals",
            showing: true,
        },

        {
            name: "Bad Weather",
            showing: true,
        },
        {
            name: "Night driving",
            showing: true,
        },
        {
            name: "Uphill start",
            showing: true,
        },
    ];



    const untestedScenarioOption = [
        {
            name: "Parallel Parking",
            showing: true,
        },
        {
            name: "Three-Point Turn",
            showing: true,
        },
        {
            name: "Lane Change",
            showing: true,
        },
        {
            name: "Merge onto Highway",
            showing: true,
        },
        {
            name: "U-Turn",
            showing: true,
        },
        {
            name: "Stop",
            showing: true,
        },
        {
            name: "Roundabout",
            showing: true,
        },
        {
            name: "S-Parking",
            showing: true,
        },
        {
            name: "Speed limit",
            showing: true,
        },
        {
            name: "Yield to Pedestrians",
            showing: true,
        },
        {
            name: "Emergency Stop",
            showing: true,
        },
        {
            name: "Obey Traffic Signals",
            showing: true,
        },

        {
            name: "Bad Weather",
            showing: true,
        },
        {
            name: "Night driving",
            showing: true,
        },
        {
            name: "Uphill start",
            showing: true,
        },
    ];

    function handleSelectRecentMistakes(selectedList, selectedOptions) {
        if (selectedList.length > 3) {
            setRecentMistakesError(true);
            selectedList.pop(); // Remove the last added item
        } else {
            setRecentMistakesError(false);
        }
        setRecentMistakes(selectedList);
    }

    function handleSelectUntestedScenarios(selectedList, selectedOptions) {
        if (selectedList.length > 3) {
            setUntestedScenariosError(true);
            selectedList.pop(); // Remove the last added item
        } else {
            setUntestedScenariosError(false);
        }
        setUntestedScenarios(selectedList);
    }




    return (
        <div style={{
            display: 'grid',
            gridTemplateRows: 'auto auto auto 1fr',
            height: '100vh'
        }}>


            <Title titolo="Save lesson"></Title>


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

                    <label className='custom-label' style={{ marginRight: '10px', marginTop: '10px' }}>DATE </label>
                    <br></br>
                    <div style={{ marginBottom: '10px', marginLeft: '20px' }}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
=======
                <label className='custom-label' style={{ marginRight: '10px', marginTop:'10px' }}>DATE </label>
                    <br></br>
                    <div style={{marginBottom:'10px', marginLeft:'20px'}}> 
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

                </div>
                </div>


                <>
                    <Form.Group controlId="form-group1" className="mb-3">
                        <Form.Label className='custom-label'>ROUTE</Form.Label>
                        <Form.Control as="textarea" rows={1} placeholder="Briefly describe your route" />
                    </Form.Group>

                    <Form.Group controlId="form-group2" className="mb-3">
                        <Form.Label className='custom-label'>DISTANCE (IN KM)</Form.Label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Control type="range" min="1" max="100" value={sliderValue} onChange={e => setSliderValue(e.target.value)} style={{ marginRight: '10px' }} />
                            <span>{sliderValue}</span>
                        </div>
                    </Form.Group>





                    <Form.Group  style={{marginLeft:'2px'}} className="form-group" controlId="lastestMistakes">
                        <Form.Label className='custom-label'>MISTAKES</Form.Label>


                        {recentMistakesError && <p>You can only select 3 items</p>}



                        <Multiselect
                            className="planningMultiSelect"
                            options={recentMistakeOption} // Options to display in the dropdown
                            // selectedValues={selectedValue} // Preselected value to persist in dropdown
                            onSelect={handleSelectRecentMistakes} // Function will trigger on select event
                            onRemove={selectedOptions => handleRemove(selectedOptions)} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown optionsù
                            placeholder='Type & search mistakes'
                            emptyRecordMsg='Driving scenario not found'
                            closeIcon='cancel'
                            closeOnSelect={false}
                            avoidHighlightFirstOption={true}
                            hidePlaceholder={true}
                            showArrow={true}
                            keepSearchTerm={true}
                            style={{
                                chips: {
                                    background: " #004E98",
                                    borderRadius: "20px",

                                },
                                searchBox: {
                                    border: "1px solid  #C0C0C0",
                                    borderRadius: "13px",
                                    boxShadow: "0 0 0 0",
                                    padding: "10px",
                                    fontSize: "16px",
                                    color: "#004E98",
                                    width: "100%",
                                    height: "80px",
                                    background: "white",

                                },
                            }
                            }



                        />



                    </Form.Group>


                    {untestedScenariosError && <p>You can only select 3 items</p>}


                    <Form.Group style={{ marginLeft: '2px' }} className="form-group" controlId="lastestMistakes">
                        <Form.Label className='custom-label'>OTHER SCENARIOS</Form.Label>
                        <Multiselect
                            className="planningMultiSelect"
                            options={untestedScenarioOption} // Options to display in the dropdown
                            // selectedValues={selectedValue} // Preselected value to persist in dropdown
                            onSelect={handleSelectUntestedScenarios} // Function will trigger on select event
                            onRemove={selectedOptions => handleRemove(selectedOptions)} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            placeholder='Type & search scenarios'
                            emptyRecordMsg='Driving scenario not found'
                            closeIcon='cancel'
                            closeOnSelect={false}
                            avoidHighlightFirstOption={true}
                            hidePlaceholder={true}
                            showArrow={true}
                            keepSearchTerm={true}
                            style={{
                                chips: {
                                    background: " #004E98",
                                    borderRadius: "20px",

                                },
                                searchBox: {
                                    border: "1px solid  #C0C0C0",
                                    borderRadius: "13px",
                                    boxShadow: "0 0 0 0",
                                    padding: "10px",
                                    fontSize: "16px",
                                    color: "#004E98",
                                    width: "100%",
                                    height: "80px",
                                    background: "white",

                                },
                            }
                            }


                        />


                    </Form.Group>



                    <Form.Group className="d-flex justify-content-center ">
                            <button className="discard-btn" onClick={handleDiscard}>DISCARD</button>
                        
                        
                        <button className="save-btn" onClick={openSaveModal}>SAVE LESSON</button>
                    </Form.Group>
                    
                </>



                <Row style={{ height: '4rem' }}>
                </Row>
                <Row>
                    <MyNavbar />
                </Row>
            </Container>


            <Modal show={showSaveModal} onHide={closeSaveModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Save</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to save this lesson?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeSaveModal}>GO BACK</Button>
                    <Button variant="primary" onClick={() => { createLesson(); closeSaveModal(); }}>SAVE LESSON</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showDiscardModal} onHide={cancelDiscard}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Discard</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to discard your changes and leave to Homepage?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDiscard}>GO BACK</Button>
                    <Button variant="primary" onClick={confirmDiscard}>DISCARD LESSON</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />


        </div>
    )
}

export { SaveLesson };