import React, { useState, useEffect } from 'react';
import ItineraryCreation from './ItineraryCreation';
import { useAuth } from '../../AuthContext';
import swal from 'sweetalert2';

function PastItineraries() {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

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
        setItineraries(data.itineraries);
      })
      .catch((error) => console.error('Fetching itineraries failed:', error));
  }, [user.id]);

  const handleRowClick = async (destinationId) => {
    try {
      const response = await fetch(`/destinations/${destinationId}`);
      if (!response.ok) {
        throw new Error('Fetching destination details failed');
      }
      const data = await response.json();
      setSelectedDestination(data);
      showPopup();
    } catch (error) {
      console.error('Fetching destination details failed:', error);
    }
  };

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

  const showPopup = () => {
    swal.fire({
      title: 'Destination Details',
      html: `<div>Name: ${selectedDestination.name}</div><div>Description: ${selectedDestination.description}</div><div>Location: ${selectedDestination.location}</div>`,
      icon: 'info',
      confirmButtonText: 'Close',
    });
  };


  return (
    <div className="w-full">
      <ItineraryCreation setItineraries={setItineraries} />

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
            <tr key={itinerary.id}  style={{cursor:"pointer"}}>
              <td className="border px-4 py-2">{itinerary.date}</td>
              <td className="border px-4 py-2"> {new Date(itinerary.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
              <td className="border px-4 py-2">{itinerary.activity}</td>
              <td className="border px-4 py-2" onClick={() => handleRowClick(itinerary.destination_id)} >click to view</td>
              <td className="border px-4 py-2">{itinerary.budget}</td>
              <td className="border px-4 py-2">
                <p
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteClick(itinerary.id)}
                >
                  X
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PastItineraries;

