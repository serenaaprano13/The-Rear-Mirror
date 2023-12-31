import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="h1">The Rear Mirror - loading...</h1>
        <button className="highlighted-button">
        Are you ready for it? {'    '}
        <FontAwesomeIcon icon={faSpinner} /> 
        </button>
      </header>
    </div>
  );
}


export default App
