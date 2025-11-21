import React from "react";
import "./Profile.css";
import { FiEdit2 } from "react-icons/fi";

export default function Profile() {
  return (
    <div className="profile-container">

      {/* Back + Title */}
      <div className="profile-header">
        <span className="back-arrow">←</span>
        <h2>Profile</h2>
      </div>

      {/* Avatar Section */}
      <div className="avatar-section">
        <div className="avatar-circle">
          <span className="avatar-letter">T</span>
        </div>

        <div className="edit-icon">
          <FiEdit2 size={16} color="#fff" />
        </div>
      </div>

      {/* Form Fields */}
      <div className="form-section">

        <label>Name</label>
        <input type="text" value="Thanzeel" className="input-box" readOnly />

        <label>Email</label>
        <input
          type="email"
          value="thanzeelt717@gmail.com"
          className="input-box"
          readOnly
        />

        <label>Phone Number</label>
        <input
          type="text"
          value="+91  8075371985"
          className="input-box"
          readOnly
        />
      </div>

      {/* Buttons */}
      <button className="save-btn" disabled>
        Save Changes
      </button>

      <button className="delete-btn">
        Delete Account
      </button>
    </div>
  );
}