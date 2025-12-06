// src/pages/Profile.jsx
import React from "react";
import "./../components/Profile.css";
import "../components/Home.css";

export default function Profile() {
  return (
    <div className="profile-page">
      {/* Header Section */}
      <header className="profile-header">
        <div className="profile-info">
          <img
            src="https://via.placeholder.com/60"
            alt="user"
            className="profile-pic"
          />
          <div>
            <h2 className="profile-name">Muhammed Hashim. K</h2>
            <p className="profile-phone">+91-8136991817</p>
            <a href="Edit" className="edit-link">Edit Profile ➜</a>
          </div>
        </div>
        <div className="profile-illustration">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1000/1000913.png"
            alt="ev illustration"
          />
        </div>
      </header>

      {/* My EV Section */}
      <section className="my-evs">
        <h3 className="section-title">My EVs</h3>
        <div className="ev-card">
          <img
            src="https://cdn.pixabay.com/photo/2021/05/20/12/23/electric-scooter-6267250_1280.png"
            alt="Ather 450 Apex"
            className="ev-image"
          />
          <p className="ev-name">ATHER • 450 Apex</p>
        </div>
      </section>

      {/* Wallet Section */}
      <section className="wallet-section">
        <div className="wallet-card">
          <div className="wallet-left">
            <span className="wallet-icon">💳</span>
            <span>My Wallet</span>
          </div>
          <div className="wallet-right">
            <span>₹0.00</span>
            <span className="arrow">›</span>
          </div>
        </div>
      </section>

      {/* General Options */}
   <section className="general-section">
  <h3 className="section-title">General</h3>
  <ul className="options-list">
    <li>
      <a href="/invite">
        <span>👥</span> Invite your Friends
      </a>
    </li>
    <li>
      <a href="/help">
        <span>🛠️</span> Help and Support
      </a>
    </li>
    <li>
      <a href="/privacy">
        <span>🔒</span> Privacy Policy
      </a>
    </li>
  </ul>
</section>

      {/* Logout Button */}
      <div className="logout-container">
        <button className="logout-btn">⎋ Logout</button>
      </div>

     
  
    </div>
  );
}
