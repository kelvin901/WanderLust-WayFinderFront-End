import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DestinationRecommendations = () => {
  const [recommendedDestinations, setRecommendedDestinations] = useState([]);

  useEffect(() => {
    // Simulate fetching recommended destinations from the backend API based on user preferences
    // Replace this URL with your actual API endpoint
    const API_URL = 'https://your-backend-api.com/recommendations';

    // Sample user preferences (You can replace these with actual user data from the profile)
    const userPreferences = {
      interests: 'adventure',
      budget: 'moderate',
      travelDates: '2023-08-15',
      pastTravelHistory: false,
    };

    // Fetch recommended destinations from the API
    axios
      .post(API_URL, userPreferences)
      .then((response) => {
        setRecommendedDestinations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recommended destinations:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once, on component mount

  return (
    <div>
      <h2>Recommended Destinations</h2>
      {recommendedDestinations.length === 0 ? (
        <p>No recommended destinations found based on your preferences.</p>
      ) : (
        <ul>
          {recommendedDestinations.map((destination) => (
            <li key={destination.id}>
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <p>Estimated Travel Cost: ${destination.travelCost}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationRecommendations;
