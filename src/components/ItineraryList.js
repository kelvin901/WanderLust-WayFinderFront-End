import React from 'react';

const ItineraryList = ({ itinerary }) => {
  return (
    <div>
      <h3>Itinerary</h3>
      {itinerary.length === 0 ? (
        <p>Your itinerary is empty. Add destinations, activities, and accommodations to get started!</p>
      ) : (
        <ul>
          {itinerary.map((item) => (
            <li key={item.id}>
              <p>Destination: {item.destination}</p>
              <p>Activity: {item.activity}</p>
              <p>Accommodation: {item.accommodation}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItineraryList;
