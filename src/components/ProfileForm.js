import React, { useState } from 'react';

const ProfileForm = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    travelPreferences: '',
    budgetRange: '',
    preferredActivities: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the backend API for profile creation)
    console.log('Profile data submitted:', profileData);
    // Reset the form after submission
    setProfileData({
      firstName: '',
      lastName: '',
      travelPreferences: '',
      budgetRange: '',
      preferredActivities: '',
    });
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Travel Preferences:</label>
          <textarea
            name="travelPreferences"
            value={profileData.travelPreferences}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Budget Range:</label>
          <input
            type="text"
            name="budgetRange"
            value={profileData.budgetRange}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preferred Activities:</label>
          <textarea
            name="preferredActivities"
            value={profileData.preferredActivities}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
