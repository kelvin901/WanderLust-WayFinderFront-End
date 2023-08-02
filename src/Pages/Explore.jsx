import React, { useState, useEffect } from 'react';

const Destinations = () => {
  const [itinerariesData, setItinerariesData] = useState([]);
  const [editingItineraryId, setEditingItineraryId] = useState(null);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      const response = await fetch('/api/itineraries'); // Replace with your backend API endpoint for fetching itineraries
      if (!response.ok) {
        throw new Error('Failed to fetch itineraries');
      }
      const data = await response.json();
      setItinerariesData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateItinerary = async (itineraryId, updatedData) => {
    try {
      const response = await fetch(`/api/itineraries/${itineraryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update itinerary');
      }
      fetchItineraries();
      setEditingItineraryId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItinerary = async (itineraryId) => {
    try {
      const response = await fetch(`/api/itineraries/${itineraryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete itinerary');
      }
      fetchItineraries();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Itineraries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {itinerariesData.map((itinerary) => (
          <div key={itinerary.id} className="bg-white rounded-lg shadow p-4">
            {editingItineraryId === itinerary.id ? (
              <>
                <h2 className="text-xl font-bold mb-2">
                  <input
                    type="text"
                    value={itinerary.activity}
                    onChange={(e) => handleUpdateItinerary(itinerary.id, { activity: e.target.value })}
                    className="border-b-2 border-gray-400 outline-none focus:border-blue-600"
                  />
                </h2>
                <button
                  onClick={() => setEditingItineraryId(null)}
                  className="text-sm text-gray-500 focus:outline-none mb-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-2">{itinerary.activity}</h2>
                <p className="text-gray-600 mb-2">
                  Date: {new Date(itinerary.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">
                  Time: {new Date(itinerary.time).toLocaleTimeString()}
                </p>
                <p className="text-gray-600 mb-2">Duration: {itinerary.duration}</p>
                <h3 className="text-lg font-semibold mb-1">Destination:</h3>
                <p>{itinerary.destination.name}</p>
                <p className="text-gray-600 mt-2">{itinerary.destination.description}</p>
                <p className="text-gray-600 mt-2">Location: {itinerary.destination.location}</p>
              </>
            )}
            <div className="flex mt-2">
              {editingItineraryId === itinerary.id ? (
                <button
                  onClick={() => handleUpdateItinerary(itinerary.id, itinerary)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditingItineraryId(itinerary.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteItinerary(itinerary.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
