import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import swal from 'sweetalert2';

function PastItineraries() {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    // Fetch user's itineraries here
    fetch(`/users/${user.id}/itineraries`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fetching itineraries failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched itineraries:', data.itineraries); // Check the data structure here
        setItineraries(data.itineraries);
      })
      .catch((error) => console.error('Fetching itineraries failed:', error));
  }, [user.id]);
  

  const handleDeleteClick = (itineraryId) => {
    swal.fire({
      title: 'Delete Itinerary',
      text: 'Are you sure you want to delete this itinerary?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d9534f',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete action here
        fetch(`/itineraries/${itineraryId}`, {
          method: 'DELETE',
        })
          .then(() => {
            setItineraries((prevItineraries) =>
              prevItineraries.filter((itinerary) => itinerary.id !== itineraryId)
            );
            swal.fire('Deleted!', 'Itinerary has been deleted.', 'success');
          })
          .catch((error) => console.error('Deleting itinerary failed:', error));
      }
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Your Itineraries</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Activity</th>
            <th className="px-4 py-2">Destination</th>
            <th className="px-4 py-2">Budget</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {itineraries.map((itinerary) => (
            <tr key={itinerary.id}>
              <td className="border px-4 py-2">{itinerary.date}</td>
              <td className="border px-4 py-2">{itinerary.time}</td>
              <td className="border px-4 py-2">{itinerary.activity}</td>
              <td className="border px-4 py-2">{itinerary.destination}</td>
              <td className="border px-4 py-2">{itinerary.budget}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteClick(itinerary.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PastItineraries;
