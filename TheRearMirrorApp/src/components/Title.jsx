import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


const Title = ({titolo}) => {

  const navigate= useNavigate();
  const location=useLocation();


  const returnBack = () => {
    navigate(-1);
  }


  return (

    <header>
      <button className="back-btn" onClick={returnBack}>
        <FontAwesomeIcon icon={faChevronLeft} /> {" "}
          Back
    </button>
			<h3 className="header-title">{titolo}</h3>
    </header>
	
   
);
    
  
}

export default Title;