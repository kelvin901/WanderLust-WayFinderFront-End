import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import Swal from 'sweetalert2';
const ItineraryCreation = () => {
  const { user } = useAuth();
  const [userDestinations, setUserDestinations] = useState([]);
  useEffect(() => {
    fetch(`/users/${user.id}/destinations`)
      .then((response) => response.json())
      .then((data) => {
        setUserDestinations(data);
      })
      .catch((error) => {
        console.error('Error fetching destinations:', error);
      });
  }, [user.id]);
  const handleAddItinerary = () => {
    Swal.fire({
      title: 'Create Itinerary',
      html: `
        <form id="itinerary-form">
          <div class="mb-4">
            <label for="destination" class="block text-sm font-medium text-gray-700">
              Select Destination
            </label>
            <select
              id="destination"
              class="border border-gray-400 p-2 w-full"
            >
              <option value="" disabled>Select a destination</option>
              ${userDestinations
                .map(
                  (destination) => `
                    <option value="${destination.id}">
                      ${destination.name}
                    </option>
                  `
                )
                .join('')}
            </select>
          </div>
          <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              class="border border-gray-400 p-2 w-full"
              placeholder="Enter date"
            />
          </div>
          <div class="mb-4">
            <label for="time" class="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              id="time"
              class="border border-gray-400 p-2 w-full"
              placeholder="Enter time"
            />
          </div>
          <div class="mb-4">
            <label for="activity" class="block text-sm font-medium text-gray-700">
              Activity
            </label>
            <textarea
              id="activity"
              class="border border-gray-400 p-2 w-full"
              placeholder="Enter activity"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="duration" class="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              class="border border-gray-400 p-2 w-full"
              placeholder="Enter duration"
            />
          </div>

          <div class="mb-4">
          <label for="duration" class="block text-sm font-medium text-gray-700">
            Budget
          </label>
          <input
            type="number"
            id="budget"
            class="border border-gray-400 p-2 w-full"
            placeholder="Enter budget"
          />
        </div>         

        </form>
      `,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const form = document.getElementById('itinerary-form');
        const selectedDestination = form.destination.value;
        const selectedDate = form.date.value;
        const selectedTime = form.time.value;
        const selectedActivity = form.activity.value;
        const selectedDuration = form.duration.value;
        const selectedBudget = form.budget.value;
        return fetch('/itineraries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.id,
            destination_id: selectedDestination,
            date: selectedDate,
            time: selectedTime,
            activity: selectedActivity,
            duration: selectedDuration,
            budget: selectedBudget,
          }),
         })
          .then((response) => response.json())
          .then((data) => {
            console.log('Itinerary created:', data);
            Swal.fire('Success!', 'Itinerary created successfully', 'success');
          })
          .catch((error) => {
            console.error('Error creating itinerary:', error);
            Swal.fire('Error', 'An error occurred while creating the itinerary', 'error');
          });
      },
    });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Create Itinerary</h2>
      <button
        onClick={handleAddItinerary}
        className="bg-blue-500 text-white px-4 py-2 rounded w-1/4"
      >
        Add Itinerary
      </button>
    </div>
  );
};
export default ItineraryCreation;
