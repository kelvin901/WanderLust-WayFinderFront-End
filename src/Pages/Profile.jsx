import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import Swal from 'sweetalert2';
import { useAuth } from '../AuthContext';
const Profile = () => {
  const { user, updateUser } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    username: user.username || '',
    email: user.email || '',
    avatar: user.avatar || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSettingsClick = () => {
    setShowSettings(true);
  };


  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'dldgcvsi');
      try {
        // Show loading animation here
        const loadingAnimation = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.querySelector('.swal2-progress-bar').style.backgroundColor = '#4caf50'; // Customize the progress bar color
          },
        });
  
        loadingAnimation.fire({
          title: 'Uploading...',
          timer: 0,
          onBeforeOpen: () => {
            loadingAnimation.showProgressSteps = true; // Fixed: Removed the colon and set the property directly
          },
        });
  
        const response = await fetch('https://api.cloudinary.com/v1_1/db4tmeuux/image/upload', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        setFormData((prevState) => ({ ...prevState, avatar: data.secure_url }));
  
        // Close loading animation
        loadingAnimation.close();
  
        console.log(formData);
      } catch (error) {
        console.error('Error uploading image:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while uploading the image',
          icon: 'error',
        });
      }
    }
  };
  






  const handleSubmit = async () => {
    setShowSettings(false);
    const { id, ...formDataWithoutId } = formData;
    try {
      const updatedUser = await updateUser(formDataWithoutId);
      Swal.fire({
        title: 'Success',
        text: 'Profile updated successfully!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(formDataWithoutId)
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">User Profile</h2>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <Image
                  cloudName="db4tmeuux"
                  publicId={user.avatar || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                  width="80"
                  height="80"
                  crop="thumb"
                  radius="max"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>
            <button
              onClick={handleSettingsClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Settings
            </button>
          </div>
        </div>
      </div>
      {showSettings && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <form>

              <h2 className="text-3xl font-bold mb-4 text-gray-900">Update your profile</h2>
              
                <input
                type="text"
                name="first_name"
                value={formData.first_name}
                placeholder="First Name"
                class="mb-2 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                placeholder="Last Name"
                class="mb-2 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
              />
              <input
                type="text"
                name="username"
                value={formData.username}
                placeholder="Username"
                class="mb-2 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                class="mb-2 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
              />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                class="mb-4 w-full"
                onChange={handleAvatarChange}
              />
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;