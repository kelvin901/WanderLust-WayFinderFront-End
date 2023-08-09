import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import swal from 'sweetalert';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    username: user.username || '',
    email: user.email || '',
    avatar: user.avatar || null, // Set initial value to null or the user's current avatar URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'dldgcvsi');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/db4tmeuux/image/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        setFormData((prevState) => ({ ...prevState, avatar: data.secure_url }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const { id, ...formDataWithoutId } = formData;
    // console.log(formDataWithoutId);

    try {
      const updatedUser = await updateUser(formDataWithoutId);

      swal({
        title: 'Success',
        text: 'Profile updated successfully!',
        icon: 'success',
        buttons: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      // Optionally, you can show an error message using SweetAlert
    }
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  <Image
        cloudName="db4tmeuux" // Replace with your Cloudinary cloud_name
        publicId={formData.avatar || user.avatar}
        width="100"
        crop="scale"
  />

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">User Profile</h2>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="first_name" className="font-bold block mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="last_name" className="font-bold block mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="font-bold block mb-1">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="font-bold block mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="avatar" className="font-bold block mb-1">
                  Avatar:
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
