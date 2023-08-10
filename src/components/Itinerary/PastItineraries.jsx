import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import Swal from 'sweetalert2';
const PastItineraries = () => {
  const { user } = useAuth(); // Get the logged-in user from the AuthContext
  const [userItineraries, setUserItineraries] = useState([]);
  useEffect(() => {
    fetch(`/users/${user.id}/itineraries`)
      .then((response) => response.json())
      .then((data) => {
        setUserItineraries(data);
      })
      .catch((error) => {
        console.error('Error fetching itineraries:', error);
      });
  }, [user.id]);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatTime = (timeString) => {
    return timeString; // Assuming timeString is in HH:MM format
  };
  const handleDelete = (itinerary) => {
    Swal.fire({
      title: 'Delete Itinerary?',
      text: `Are you sure you want to delete the itinerary for ${itinerary.destination.name} on ${formatDate(
        itinerary.date
      )} at ${formatTime(itinerary.time)}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the deletion here
      }
    });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Past Itineraries</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Activity</th>
            <th className="px-4 py-2">Duration</th>
          </tr>
        </thead>
        <tbody>
          {userItineraries.map((itinerary) => (
            <tr key={itinerary.id} onClick={() => handleDelete(itinerary)}>
              <td className="px-4 py-2">{formatDate(itinerary.date)}</td>
              <td className="px-4 py-2">{formatTime(itinerary.time)}</td>
              <td className="px-4 py-2">{itinerary.activity}</td>
              <td className="px-4 py-2">{itinerary.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PastItineraries;