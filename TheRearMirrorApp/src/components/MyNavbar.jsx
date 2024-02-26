import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';


const MyNavbar = () => {
  return (
    <div className="downNavbar">
      <div className="down-nav-item">
        <Link to="">
        <div>
        <FontAwesomeIcon icon={faHouseUser} size="sm"/>
        Home
        </div>
        </Link> 
      </div>
        {/* TO DO: create the home page */}
        
        
      

      <div className="down-nav-item">
      <Link to="/planning">
        <div>
      <FontAwesomeIcon icon={faFileCirclePlus} size="sm" />
        Planning
        </div>
      </Link>
      </div>

      <div className="down-nav-item">
      <Link to="/lookback">
        <div>
        <FontAwesomeIcon icon={faCalendar} size="sm"/>
        LookBack
        </div></Link>
      </div>


      <div className="down-nav-item">
      <Link to="/savelesson">
        <div>
        <FontAwesomeIcon icon={faFloppyDisk} size="sm"/>
        SaveLesson
        </div></Link>
      </div>
      

      <div className="down-nav-item">
      <Link to="/evaluation">
        <div>
        <FontAwesomeIcon icon={faStarHalfStroke}size="sm"/>
        Evaluation
        </div>
      </Link> {/* TO DO: create the evaluation page */}
        </div>
  
    </div>
  );
};

export default MyNavbar;
