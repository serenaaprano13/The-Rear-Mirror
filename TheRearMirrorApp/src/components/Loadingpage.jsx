import React from "react";
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="div">
        <div className="overlap">
          <div className="developed-by">
            <div className="overlap-group">
              <div className="developed-by-gruppo">
                Developed by
                EDU team             
              </div>
            </div>
          </div>
          <img className="car" alt="Car" src="Car.png" /> 
        </div>
        <div className="overlap-2">
          <div className="text-wrapper">The Rear Mirror</div>
          <div className="mirror-inside" />
          <img className="rear-mirror" alt="Rear mirror" src={'/rear-mirror.png'} />
        </div>
        <p className="p">Looking back to safely go forward</p>
        <div className="text-wrapper-2">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingPage;
