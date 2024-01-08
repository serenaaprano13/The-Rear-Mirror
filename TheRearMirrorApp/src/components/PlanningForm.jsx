import React from "react";
import { IconImportDownload } from "./IconImportDownload";
import { MuiButton } from "./MuiButton";


export const PlanningForm = () => {
  return (
    <div className="planning">
      <div className="div">
        <div className="planed-distance">
          <div className="rectangle" />
          <div className="text-wrapper">Planned Distance</div>
        </div>
        <div className="untested-scenarios">
          <div className="overlap-group">
            <div className="untested-scenarios-2">
              <MuiButton
                className="MUI-button-instance"
                overlapGroupClassName="design-component-instance-node"
                property1="default"
                text="Parking"
              />
              <MuiButton
                className="MUI-button-2"
                overlapGroupClassName="MUI-button-3"
                property1="default"
                text="U Turn"
              />
              <MuiButton
                className="MUI-button-4"
                overlapGroupClassName="MUI-button-5"
                property1="default"
                text="Highway"
              />
              <MuiButton
                className="MUI-button-6"
                overlapGroupClassName="MUI-button-7"
                property1="default"
                text="Night Time"
              />
              <MuiButton
                className="MUI-button-8"
                overlapGroupClassName="MUI-button-9"
                property1="default"
                text="Heavy Traffic"
              />
              <MuiButton
                className="MUI-button-10"
                overlapGroupClassName="MUI-button-11"
                property1="default"
                text="Snow"
              />
              <MuiButton
                className="MUI-button-12"
                overlapGroupClassName="MUI-button-13"
                property1="default"
                text="Oil Change"
              />
              <MuiButton
                className="MUI-button-14"
                overlapGroupClassName="MUI-button-5"
                property1="default"
                text="Icy Road"
              />
            </div>
            <div className="untested-scenarios-wrapper">
              <div className="untested-scenarios-3">Untested Scenarios</div>
            </div>
          </div>
        </div>
        <div className="l-mistakes">
          <div className="text-wrapper-2">Latest Mistakes</div>
          <div className="latest-mistakes">
            <MuiButton
              className="MUI-button-instance"
              overlapGroupClassName="MUI-button-15"
              property1="default"
              text="Speeding"
            />
            <MuiButton
              className="MUI-button-2"
              overlapGroupClassName="MUI-button-15"
              property1="default"
              text="Red Light"
            />
            <MuiButton
              className="MUI-button-4"
              overlapGroupClassName="MUI-button-13"
              property1="default"
              text="Uphill Start"
            />
            <MuiButton
              className="MUI-button-6"
              overlapGroupClassName="MUI-button-15"
              property1="default"
              text="S Parking"
            />
            <MuiButton
              className="MUI-button-8"
              overlapGroupClassName="MUI-button-16"
              property1="default"
              text="Overtake"
            />
            <MuiButton
              className="MUI-button-10"
              overlapGroupClassName="MUI-button-17"
              property1="default"
              text="Rain"
            />
            <MuiButton
              className="MUI-button-12"
              overlapGroupClassName="MUI-button-18"
              property1="default"
              text="Flat Tire"
            />
            <MuiButton
              className="MUI-button-14"
              overlapGroupClassName="MUI-button-19"
              property1="default"
              text="Roundabout"
            />
          </div>
        </div>
        <div className="header-planning">
          <div className="overlap">
            <div className="rectangle-2" />
            <div className="text-wrapper-3">Planning</div>
            <div className="save">
              <div className="overlap-group-2">
                <img className="union" alt="Union" src="union.svg" />
                <IconImportDownload className="icon-import-download-instance" icon="image.svg" />
              </div>
            </div>
            <div className="frame">
              <img className="THE-REAR-MIRROR" alt="The REAR MIRROR" src="THE-REAR-MIRROR.png" />
            </div>
            <div className="back">
              <img className="img" alt="Back" src="back.png" />
            </div>
          </div>
        </div>
        <div className="bottom-buttons">
          <div className="overlap-2">
            <img className="folder" alt="Folder" src="folder.svg" />
            <img className="home" alt="Home" src="home.svg" />
            <img className="review" alt="Review" src="review.svg" />
            <div className="bottom-cloud" />
            <div className="review-2" />
            <div className="new-lesson" />
            <img className="new-lesson-2" alt="New lesson" src="new-lesson.svg" />
            <div className="folder-2" />
            <div className="home-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningForm;