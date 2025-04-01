import React, { useState } from "react";
import "./ProfileStyles.css";
 // Add CSS file for styling

const ProfilePage = () => {
  const [user, setUser] = useState({
    fullName: "",
    age: "",
    bloodType: "",
    contactNumber: "",
    profilePicture: null, // Store image URL
  });

  const [editMode, setEditMode] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, profilePicture: imageUrl });
    }
  };

  // Handle input change for personal details
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Save updated profile details
  const handleSaveProfile = () => {
    setEditMode(false);
    alert("Profile Updated Successfully!");
  };

  // Logout function
  const handleLogout = () => {
    alert("Logged out successfully!");
    // Redirect or clear session here
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      {/* Profile Picture Section */}
      <div className="profile-picture">
        <img src={user.profilePicture || "https://via.placeholder.com/150"} alt="Profile" />
        <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
      </div>

      {/* Personal Details Section */}
      <div className="profile-details">
        <label>Full Name:</label>
        {editMode ? (
          <input type="text" name="fullName" value={user.fullName} onChange={handleInputChange} />
        ) : (
          <p>{user.fullName}</p>
        )}

        <label>Age:</label>
        {editMode ? (
          <input type="number" name="age" value={user.age} onChange={handleInputChange} />
        ) : (
          <p>{user.age}</p>
        )}

        <label>Blood Type:</label>
        {editMode ? (
          <select name="bloodType" value={user.bloodType} onChange={handleInputChange}>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        ) : (
          <p>{user.bloodType}</p>
        )}

        <label>Contact Number:</label>
        {editMode ? (
          <input type="text" name="contactNumber" value={user.contactNumber} onChange={handleInputChange} />
        ) : (
          <p>{user.contactNumber}</p>
        )}

        {editMode ? (
          <button onClick={handleSaveProfile}>Save</button>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>

      {/* Change Password Section */}
      <div className="change-password">
        <h3>Change Password</h3>
        <input type="password" name="oldPassword" placeholder="Old Password" onChange={handlePasswordChange} />
        <input type="password" name="newPassword" placeholder="New Password" onChange={handlePasswordChange} />
        <button onClick={() => alert("Password changed successfully!")}>Update Password</button>
      </div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
