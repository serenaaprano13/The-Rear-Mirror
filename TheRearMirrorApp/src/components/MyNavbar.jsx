import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

const MyNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="downNavbar">
      <div className="down-nav-item" onClick={()=> navigate('/')}>
        <div>
        <FontAwesomeIcon icon={faHouseUser} size="sm"/>
        Home
        </div>
       
      </div>

      <div className="down-nav-item"onClick={()=> navigate('/planning')}>
        <div>
      <FontAwesomeIcon icon={faFileCirclePlus} size="sm" />
        Planning
        </div>
      </div>

      <div className="down-nav-item" onClick={()=> navigate('/lookback')}>
        <div>
        <FontAwesomeIcon icon={faCalendar} size="sm"/>
        LookBack
        </div>
      </div>


      <div className="down-nav-item" onClick={()=> navigate('/savelesson')}>
        <div>
        <FontAwesomeIcon icon={faFloppyDisk} size="sm"/>
        SaveLesson
        </div>
      </div>
      

      <div className="down-nav-item" onClick={()=> navigate('/evaluation')}>
        <div>
        <FontAwesomeIcon icon={faStarHalfStroke}size="sm"/>
        Evaluation
        </div>
     
        </div>
  
    </div>
  );
};

export default MyNavbar;
