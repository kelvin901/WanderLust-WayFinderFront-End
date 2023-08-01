import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold leading-tight text-gray-900">
            User Profile
          </h2>
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="mb-4">
              <span className="font-bold">First Name:</span> {user.first_name}
            </div>
            <div className="mb-4">
              <span className="font-bold">Last Name:</span> {user.last_name}
            </div>
            <div className="mb-4">
              <span className="font-bold">Username:</span> {user.username}
            </div>
            <div className="mb-4">
              <span className="font-bold">Email:</span> {user.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
