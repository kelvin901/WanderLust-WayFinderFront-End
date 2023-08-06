import React, { useState } from 'react';

const DestinationInput = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [interests, setInterests] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform a fetch request to save the destination data to the server
    // You can use the fetch API or a library like Axios for the request
    // For example, using fetch:
    fetch('/destinations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        interests,
        budget,
        location,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, you can show a success message or redirect
        console.log('Destination saved:', data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error saving destination:', error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add a Destination</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Destination Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter destination name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
            Interests
          </label>
          <textarea
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter interests"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Budget
          </label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter budget"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-400 p-2 w-full"
            placeholder="Enter location"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Destination
        </button>
      </form>
    </div>
  );
};

export default DestinationInput;
