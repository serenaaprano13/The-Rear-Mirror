import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";


export const MuiButton = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <button
      className={`MUI-button ${state.property1} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="button">
        {state.property1 === "default" && <>Button</>}

        {state.property1 === "variant-2" && <div className="text-wrapper">Button</div>}
      </div>
    </button>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "click":
        return {
          property1: "variant-2",
        };
    }
  }

  if (state.property1 === "variant-2") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  return state;
}

MuiButton.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};