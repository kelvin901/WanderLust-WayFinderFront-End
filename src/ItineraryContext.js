import React, { createContext, useContext, useState } from 'react';

const ItineraryContext = createContext();

export const useItinerary = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const [userItineraries, setUserItineraries] = useState([]);
  const [userDestinations, setUserDestinations] = useState([]); // New state for destinations

  const updateItineraries = (newItineraries) => {
    setUserItineraries(newItineraries);
  };

  const updateDestinations = (newDestinations) => {
    setUserDestinations(newDestinations);
  };

  return (
    <ItineraryContext.Provider
      value={{ userItineraries, updateItineraries, userDestinations, updateDestinations }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};
