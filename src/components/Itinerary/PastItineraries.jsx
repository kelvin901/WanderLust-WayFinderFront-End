import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';

const PastItineraries = () => {
  const { user } = useAuth(); // Get the logged-in user from the AuthContext
  const [userItineraries, setUserItineraries] = useState([]);

  useEffect(() => {
    // Fetch past itineraries for the logged-in user when the component mounts
    // You can adjust the API endpoint according to your server setup
    fetch(`/users/${user.id}/itineraries`)
      .then((response) => response.json())
      .then((data) => {
        setUserItineraries(data);
      })
      .catch((error) => {
        console.error('Error fetching itineraries:', error);
      });
  }, [user.id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Past Itineraries</h2>
      <ul>
        {userItineraries.map((itinerary) => (
          <li key={itinerary.id}>
            {/* Display itinerary details */}
            <p>Destination: {itinerary.destination.name}</p>
            <p>Date: {itinerary.date}</p>
            <p>Time: {itinerary.time}</p>
            {/* Add other itinerary details you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastItineraries;
