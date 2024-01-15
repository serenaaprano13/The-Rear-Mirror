import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';


const MyNavbar = () => {
  return (
    <div className="downNavbar">
      <div className="down-nav-item">
        <Link to="*">
        <div>
        <FontAwesomeIcon icon={faHouseUser} size="lg"/>
        Home
        </div>
        </Link> 
      </div>
        {/* TO DO: create the home page */}
        
        
      

      <div className="down-nav-item">
      <Link to="/planning">
        <div>
      <FontAwesomeIcon icon={faFileCirclePlus} size="lg" />
        Planning
        </div>
      </Link>
      </div>

      <div className="down-nav-item">
      <Link to="*">
        <div>
        <FontAwesomeIcon icon={faCalendar} size="lg"/>
        Look Back
        </div></Link> {/* TO DO: create the lookback page */}
      </div>
      

      <div className="down-nav-item">
      <Link to="*">
        <div>
        <FontAwesomeIcon icon={faStarHalfStroke}size="lg"/>
        Evaluation
        </div>
      </Link> {/* TO DO: create the evaluation page */}
        </div>
  
    </div>
  );
};

export default MyNavbar;
