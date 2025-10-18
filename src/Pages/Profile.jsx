import React from "react";
import {
  Wallet,
  Users,
  Headphones,
  Shield,
  MessageSquare,
  PlusCircle,
  Car,
} from "lucide-react";

const Profile = () => {
  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="avatar"></div>
        <h2 className="username">User Name</h2>
        <p className="phone">+91-XXXXXXXXXX</p>
        <button className="edit-btn">Edit Profile →</button>
      </div>

      {/* My EVs Section */}
      <div className="card">
        <h3>My EVs</h3>
        <div className="ev-display">
          <img
            src="https://i.ibb.co/7RSbct2/bmw-i4.png"
            alt="EV"
            className="ev-img"
          />
          <p className="ev-model">BMW • i4</p>
        </div>
      </div>

      {/* EV Vehicles Section */}
      <div className="card">
        <h3>My EV Vehicles</h3>
        <div className="vehicle-list">
          <div className="vehicle-item">
            <Car className="icon" />
            <div>
              <p className="vehicle-name">Tata Nexon EV</p>
              <p className="vehicle-id">ID: EV1234</p>
            </div>
          </div>

          <div className="vehicle-item">
            <Car className="icon" />
            <div>
              <p className="vehicle-name">MG ZS EV</p>
              <p className="vehicle-id">ID: EV5678</p>
            </div>
          </div>

          <button className="add-vehicle-btn">
            <PlusCircle className="icon" /> Add Vehicle
          </button>
        </div>
      </div>

      {/* Wallet Section */}
      <div className="wallet-card">
        <div className="wallet-info">
          <Wallet className="icon" />
          <p>My Wallet</p>
        </div>
        <p className="wallet-balance">₹0.00</p>
      </div>

      {/* General Section */}
      <div className="card">
        <div className="menu-item">
          <Users className="icon" />
          <p>Invite your friends</p>
        </div>
        <div className="menu-item">
          <Headphones className="icon" />
          <p>Help and Support</p>
        </div>
        <div className="menu-item">
          <Shield className="icon" />
          <p>Privacy Policy</p>
        </div>
        <div className="menu-item">
          <MessageSquare className="icon" />
          <p>Feature Request</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button>
          <i className="ri-flashlight-line"></i>
          <span>Chargers</span>
        </button>
        <button>
          <i className="ri-map-pin-line"></i>
          <span>Trip</span>
        </button>
        <button>
          <i className="ri-bar-chart-2-line"></i>
          <span>Activity</span>
        </button>
        <button className="active">
          <i className="ri-user-line"></i>
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;