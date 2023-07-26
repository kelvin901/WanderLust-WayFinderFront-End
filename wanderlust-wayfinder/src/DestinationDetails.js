import React, { useState } from 'react';
import destinationsData from './destinations.json'; // Import the curated data from destinations.json

const DestinationDetails = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleDestinationClick = (destinationId) => {
    const selected = destinationsData.destinations.find((destination) => destination.id === destinationId);
    setSelectedDestination(selected);
  };

  return (
    <div>
      <h2>Curated Travel Information</h2>
      <ul>
        {destinationsData.destinations.map((destination) => (
          <li key={destination.id} onClick={() => handleDestinationClick(destination.id)}>
            {destination.name}
          </li>
        ))}
      </ul>

      {selectedDestination && (
        <div>
          <h3>{selectedDestination.name}</h3>
          <p>{selectedDestination.description}</p>
          <h4>Top Attractions:</h4>
          <ul>
            {selectedDestination.attractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
          <h4>Landmarks:</h4>
          <ul>
            {selectedDestination.landmarks.map((landmark, index) => (
              <li key={index}>{landmark}</li>
            ))}
          </ul>
          <p><strong>Weather:</strong> {selectedDestination.weather}</p>
          <p><strong>Safety Tips:</strong> {selectedDestination.safetyTips}</p>
        </div>
      )}
    </div>
  );
};

export default DestinationDetails;
