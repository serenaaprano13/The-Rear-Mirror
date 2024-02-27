import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeft } from 'react-icons/fa';


const Title = ({ titolo }) => {

  const navigate = useNavigate();
  const location = useLocation();


  const returnBack = () => {
    navigate(-1);
  }


  return (

    <header>
      <div style={{ display: 'flex', alignItems: 'center' }}>

      <button style={{ backgroundColor: 'transparent', border: 'none' }}  onClick={returnBack}>
        <FaArrowLeft color="white"/> {" "}
      </button>
      <h3 className="header-title">
        <div style={{ display: 'flex', marginTop: '30px' }}>

        {titolo}
        </div>
        </h3>
      </div>
    </header>


  );


}

export default Title;