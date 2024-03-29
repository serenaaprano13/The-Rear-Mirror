import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Homepage } from './components/Homepage'
import  PlanningForm  from './components/PlanningForm'
import  PlanningSummary from './components/PlanningSummary'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import MyNavbar  from './components/MyNavbar'
import { PageNotFound } from './components/PageNotFound'  
import Evaluation from './components/Evaluation'
import { LookBack } from './components/LookBack'
import { SaveLesson } from './components/SaveLesson'
import { SaveLesson1 } from './components/SaveLesson1'



import Evaluating from './components/Evaluating'
function App() {

  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/planning" element={<PlanningForm />} />
    <Route path='*' element={<PageNotFound></PageNotFound>} />
    <Route path='/evaluation' element={<Evaluation></Evaluation>} />
    <Route path='/lookback' element={<LookBack></LookBack>} />
    <Route path='/evaluating' element={<Evaluating></Evaluating>} />
    <Route path='/savelesson' element={<SaveLesson></SaveLesson>}/>
    <Route path='/savelesson1' element={<SaveLesson1></SaveLesson1>}/>
    
    <Route path='/summaryOfPlanning' element={<PlanningSummary></PlanningSummary>}/>

  </Routes>
  <MyNavbar/>
  </BrowserRouter>


}
   


export default App
