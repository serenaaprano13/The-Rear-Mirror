import React, { useEffect, useState } from 'react';

function PlanningSummary() {
  const [planning, setPlanning] = useState(null);

  useEffect(() => {
    fetch('/api/latestPlanning')
      .then(response => response.text())
      .then(text => console.log(text)) 
      .then(data => setPlanning(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Summary</h1>
      {planning && (
        <div>
          <p>Distance: {planning.distance}</p>
          <p>Selected Options: {planning.selectedOptions.map(option => option.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default PlanningSummary;