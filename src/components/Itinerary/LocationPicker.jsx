import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const mapStyle = {
  width: "100%",
  height: "300px",
};

const LocationPicker = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latlng.lat,
      lng: event.latlng.lng,
    });
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  };

  return (
    <div>
      <MapContainer
        style={mapStyle}
        center={[0, 0]}
        zoom={5}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedLocation && (
          <Marker position={selectedLocation}>
            <Popup>You selected this location</Popup>
          </Marker>
        )}
      </MapContainer>
      <button onClick={handleSaveLocation}>Save Location</button>
    </div>
  );
};

export default LocationPicker;
