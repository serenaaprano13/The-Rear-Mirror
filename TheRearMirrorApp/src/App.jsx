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
function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<LoadingPage />} />
    <Route path="/planning" element={<PlanningForm />} />
    <Route path='*' element={<PageNotFound></PageNotFound>} />
  </Routes>
  <MyNavbar/>
  </BrowserRouter>


}
   


export default App
