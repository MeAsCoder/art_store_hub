import React, { useState } from 'react';

const UserProfile = () => {
  // Initial user profile state
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    bio: 'Tell us about yourself...',
  });

  // Editable user state
  const [editedUser, setEditedUser] = useState({ ...user });

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle save profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser({ ...editedUser }); // Update user state with edited values
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div>
    
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>

        <div className="flex items-center mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300 mr-4"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Change Avatar
          </button>
        </div>

        {!isEditing ? (
          // Display user profile information
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Full Name:</p>
              <p className="text-lg text-gray-900">{user.name}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Email Address:</p>
              <p className="text-lg text-gray-900">{user.email}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Contact Number:</p>
              <p className="text-lg text-gray-900">{user.phone}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Bio:</p>
              <p className="text-lg text-gray-900">{user.bio}</p>
            </div>

            {/* Edit Profile Button */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={() => {
                setEditedUser({ ...user }); // Reset editedUser to current user data
                setIsEditing(true);
              }}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          // Editable profile form
          <form onSubmit={handleSaveProfile}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john.doe@example.com"
              />
            </div>

            {/* Contact Number Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
                Contact Number
              </label>
              <input
                type="text"
                id="phone"
                value={editedUser.phone}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(123) 456-7890"
              />
            </div>

            {/* Bio Textarea */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                rows="4"
                value={editedUser.bio}
                onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 mr-2"
                onClick={() => setIsEditing(false)} // Cancel editing
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    
 </div>
  );
 
};


export default UserProfile;
