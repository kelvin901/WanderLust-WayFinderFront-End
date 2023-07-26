// BookingComponent.js

import React from 'react';
import { bookFlight, bookHotel, bookTour } from './apiHelpers';

const BookingComponent = () => {
  const handleFlightBooking = () => {
    const flightData = {
      // Replace with flight data (e.g., origin, destination, dates, passengers, etc.)
    };
    bookFlight(flightData)
      .then((response) => {
        console.log('Flight booking successful:', response.data);
        // Handle successful booking response
      })
      .catch((error) => {
        console.error('Error booking flight:', error);
        // Handle booking error
      });
  };

  const handleHotelBooking = () => {
    const hotelData = {
      // Replace with hotel data (e.g., check-in, check-out, guests, etc.)
    };
    bookHotel(hotelData)
      .then((response) => {
        console.log('Hotel booking successful:', response.data);
        // Handle successful booking response
      })
      .catch((error) => {
        console.error('Error booking hotel:', error);
        // Handle booking error
      });
  };

  const handleTourBooking = () => {
    const tourData = {
      // Replace with tour data (e.g., tour name, dates, number of participants, etc.)
    };
    bookTour(tourData)
      .then((response) => {
        console.log('Tour booking successful:', response.data);
        // Handle successful booking response
      })
      .catch((error) => {
        console.error('Error booking tour:', error);
        // Handle booking error
      });
  };

  return (
    <div>
      <button onClick={handleFlightBooking}>Book Flight</button>
      <button onClick={handleHotelBooking}>Book Hotel</button>
      <button onClick={handleTourBooking}>Book Tour</button>
    </div>
  );
};

export default BookingComponent;
