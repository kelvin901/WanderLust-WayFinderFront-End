// // src/components/TravelItinerary.js

// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const mapStyle = {
//   width: "100%",
//   height: "300px",
// };

// const TravelItinerary = () => {
//   const [location, setLocation] = useState(null);
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [duration, setDuration] = useState("");
//   const [activity, setActivity] = useState("");
//   const [itinerary, setItinerary] = useState([]);

//   const handleLocationSelect = (selectedLocation) => {
//     setLocation(selectedLocation);
//   };

//   const handleDateChange = (e) => setDate(e.target.value);
//   const handleTimeChange = (e) => setTime(e.target.value);
//   const handleDurationChange = (e) => setDuration(e.target.value);
//   const handleActivityChange = (e) => setActivity(e.target.value);

//   const handleAddActivity = () => {
//     const newActivity = {
//       location,
//       date,
//       time,
//       duration,
//       activity,
//     };
//     setItinerary([...itinerary, newActivity]);
//     // Clear the form fields after adding activity
//     setLocation(null);
//     setDate("");
//     setTime("");
//     setDuration("");
//     setActivity("");
//   };

//   const renderItineraryTable = () => {
//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>Location</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Duration</th>
//             <th>Activity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {itinerary.map((activity, index) => (
//             <tr key={index}>
//               <td>{activity.location && `${activity.location.lat}, ${activity.location.lng}`}</td>
//               <td>{activity.date}</td>
//               <td>{activity.time}</td>
//               <td>{activity.duration}</td>
//               <td>{activity.activity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-wrap mb-4">
//         <div className="w-full lg:w-1/2 p-2">
//           <input
//             type="date"
//             placeholder="Date"
//             value={date}
//             onChange={handleDateChange}
//             className="w-full p-2 mb-2"
//           />
//           <input
//             type="time"
//             placeholder="Time"
//             value={time}
//             onChange={handleTimeChange}
//             className="w-full p-2 mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Duration"
//             value={duration}
//             onChange={handleDurationChange}
//             className="w-full p-2 mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Activity"
//             value={activity}
//             onChange={handleActivityChange}
//             className="w-full p-2 mb-2"
//           />
//           <button onClick={handleAddActivity} className="p-2 bg-blue-500 text-white">
//             Add Activity
//           </button>
//         </div>
//         <div className=" lg:w-1/2 p-2">
//           <MapContainer
//             style={mapStyle}
//             center={location || [0, 0]}
//             zoom={location ? 12 : 2}
//             onClick={(e) => handleLocationSelect(e.latlng)}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             {location && (
//               <Marker position={location}>
//                 <Popup>You selected this location</Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>
//       </div>

//       {itinerary.length > 0 && renderItineraryTable()}
//     </div>
//   );
// };

// export default TravelItinerary;


// src/components/TravelItinerary.js

import React, { useState } from "react";

const TravelItinerary = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [activity, setActivity] = useState("");
  const [itinerary, setItinerary] = useState([]);

  // Functions to handle user input and adding activities to the itinerary
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleDurationChange = (e) => setDuration(e.target.value);
  const handleActivityChange = (e) => setActivity(e.target.value);

  const handleAddActivity = () => {
    const newActivity = {
      location,
      date,
      time,
      duration,
      activity,
    };
    setItinerary([...itinerary, newActivity]);
    // Clear the form fields after adding activity
    setLocation("");
    setDate("");
    setTime("");
    setDuration("");
    setActivity("");
  };

  // Function to render the itinerary table
  const renderItineraryTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {itinerary.map((activity, index) => (
            <tr key={index}>
              <td>{activity.location}</td>
              <td>{activity.date}</td>
              <td>{activity.time}</td>
              <td>{activity.duration}</td>
              <td>{activity.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {/* Input fields for user to fill out */}
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={handleLocationChange}
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={handleDateChange}
      />
      <input
        type="time"
        placeholder="Time"
        value={time}
        onChange={handleTimeChange}
      />
      <input
        type="text"
        placeholder="Duration"
        value={duration}
        onChange={handleDurationChange}
      />
      <input
        type="text"
        placeholder="Activity"
        value={activity}
        onChange={handleActivityChange}
      />
      <button onClick={handleAddActivity}>Add Activity</button>

      {/* Display the itinerary table */}
      {itinerary.length > 0 && renderItineraryTable()}
    </div>
  );
};

export default TravelItinerary;
