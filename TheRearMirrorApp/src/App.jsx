import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { LoadingPage } from './components/Loadingpage'

function App() {
  return (
    <div className="App">
      
        <LoadingPage />
     
    
    </div>
  );
}


export default App
