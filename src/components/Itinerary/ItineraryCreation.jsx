import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';

const ItineraryCreation = () => {
  const { user } = useAuth(); // Get the logged-in user from the AuthContext
  const [userDestinations, setUserDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    // Fetch destinations for the logged-in user when the component mounts
    // You can adjust the API endpoint according to your server setup
    fetch(`/users/${user.id}/destinations`)
      .then((response) => response.json())
      .then((data) => {
        setUserDestinations(data);
      })
      .catch((error) => {
        console.error('Error fetching destinations:', error);
      });
  }, [user.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform a fetch request to save the itinerary data to the server
    // You can use the fetch API or a library like Axios for the request
    // For example, using fetch:
    fetch('/itineraries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.id, // Set the user_id to the logged-in user's id
        destination_id: selectedDestination,
        date,
        time,
        activity,
        duration,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, you can show a success message or redirect
        console.log('Itinerary created:', data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error creating itinerary:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Create Itinerary</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
            Select Destination
          </label>
          <select
            id="destination"
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="border border-gray-400 p-2 w-full"
          >
            <option value="" disabled>Select a destination</option>
            {userDestinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter date"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter time"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="activity" className="block text-sm font-medium text-gray-700">
            Activity
          </label>
          <textarea
            id="activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter activity"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter duration"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Itinerary
        </button>
      </form>
    </div>
  );
};

export default ItineraryCreation;
