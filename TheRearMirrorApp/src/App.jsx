import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { LoadingPage } from './components/Loadingpage'
import  PlanningForm  from './components/PlanningForm'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import MyNavbar  from './components/MyNavbar'
import { PageNotFound } from './components/PageNotFound'  
import Evaluation from './components/Evaluation'
import { LookBack } from './components/LookBack'



function App() {

  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<LoadingPage />} />
    <Route path="/planning" element={<PlanningForm />} />
    <Route path='*' element={<PageNotFound></PageNotFound>} />
    <Route path='/evaluation' element={<Evaluation></Evaluation>} />
    <Route path='/evaluating' element={<PageNotFound></PageNotFound>} />
    <Route path='/lookback' element={<LookBack></LookBack>} />
  </Routes>
  <MyNavbar/>
  </BrowserRouter>


}
   


export default App
