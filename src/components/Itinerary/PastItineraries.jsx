import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useItinerary } from '../../ItineraryContext';
import Swal from 'sweetalert2';
const PastItineraries = () => {
  const { user } = useAuth(); // Get the logged-in user from the AuthContext
  // const [userItineraries, setUserItineraries] = useState([]);

  const { userItineraries, updateItineraries } = useItinerary();


  useEffect(() => {
    fetch(`/users/${user.id}/itineraries`)
      .then((response) => response.json())
      .then((data) => {
        const sortedItineraries = data.sort((a, b) => {
          const aDateTime = new Date(`${a.date}T${a.time}`);
          const bDateTime = new Date(`${b.date}T${b.time}`);
          return aDateTime - bDateTime;
        });

        updateItineraries(sortedItineraries); // Update the shared state
      })
      .catch((error) => {
        console.error('Error fetching itineraries:', error);
      });
  }, [user.id, updateItineraries]);




  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
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
            <th className="px-4 py-2 bg-gray-100 text-left">Date</th>
            <th className="px-4 py-2 bg-gray-100 text-left">Time</th>
            <th className="px-4 py-2 bg-gray-100 text-left">Destination</th>            
            <th className="px-4 py-2 bg-gray-100 text-left">Activity</th>
            <th className="px-4 py-2 bg-gray-100 text-left">Duration</th>
          </tr>
        </thead>
        <tbody>
          {userItineraries.map((itinerary) => (
            <tr
              key={itinerary.id}
              onClick={() => handleDelete(itinerary)}
              className="border-b hover:bg-gray-50 cursor-pointer transition-shadow shadow-md hover:shadow-lg"
            >
              <td className="px-4 py-2">{formatDate(itinerary.date)}</td>
              <td className="px-4 py-2">{formatTime(itinerary.time)}</td>
              <td className="px-4 py-2">{itinerary.destination.name}</td>
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