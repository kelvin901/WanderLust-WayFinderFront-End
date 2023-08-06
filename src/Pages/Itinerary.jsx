
// src/components/TravelItinerary.js

import React from "react";
import DestinationInput from "../components/Itinerary/ DestinationInput";
import ItineraryCreation from "../components/Itinerary/ItineraryCreation";
import PastItineraries from "../components/Itinerary/PastItineraries";




const TravelItinerary = () => {
  
  return (

    <div>
    <DestinationInput />
    <ItineraryCreation />
    <PastItineraries />
  </div>
    );
};

export default TravelItinerary;
