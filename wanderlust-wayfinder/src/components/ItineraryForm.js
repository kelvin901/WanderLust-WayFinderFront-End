import React, { useState } from 'react';

const ItineraryForm = () => {
  const [itinerary, setItinerary] = useState([]);
  const [formData, setFormData] = useState({
    destination: '',
    activity: '',
    accommodation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItineraryItem = {
      id: Date.now(),
      destination: formData.destination,
      activity: formData.activity,
      accommodation: formData.accommodation,
    };
    setItinerary((prevItinerary) => [...prevItinerary, newItineraryItem]);
    // Reset the form after submission
    setFormData({
      destination: '',
      activity: '',
      accommodation: '',
    });
  };

  return (
    <div>
      <h2>Create Itinerary</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Activity:</label>
          <input
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Accommodation:</label>
          <input
            type="text"
            name="accommodation"
            value={formData.accommodation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add to Itinerary</button>
      </form>

      {itinerary.length > 0 && (
        <div>
          <h3>Itinerary</h3>
          <ul>
            {itinerary.map((item) => (
              <li key={item.id}>
                <p>Destination: {item.destination}</p>
                <p>Activity: {item.activity}</p>
                <p>Accommodation: {item.accommodation}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItineraryForm;
