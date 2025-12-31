import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/HostRegister.css";
import MapPicker from "../components/MapPicker";

function HostRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    stationName: "",
    totalChargers: "",
    power: "",
    rate: "",
    address: "",
  });

  // 📍 LOCATION STATE (IMPORTANT)
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚨 Location validation
    if (!location.lat || !location.lng) {
      alert("Please pick station location from map 📍");
      return;
    }

    try {
      /* =========================
         STEP 1: REGISTER HOST
      ========================== */
      // STEP 3: REGISTER HOST
await axios.post("http://localhost:5000/api/auth/register", {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  password: formData.password,
  role: "host",
});


      /* =========================
         STEP 2: LOGIN HOST
      ========================== */
      const loginRes = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const token = loginRes.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", "host");

      /* =========================
         STEP 3: REGISTER STATION
      ========================== */
      await axios.post(
        "http://localhost:5000/api/host/register",
        {
          stationName: formData.stationName,
          totalChargers: formData.totalChargers,
          power: formData.power,
          rate: formData.rate,
          address: formData.address,

          // 📍 LOCATION SENT TO DB
          location: {
            lat: location.lat,
            lng: location.lng,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Host & Station registered successfully ⚡🏠");
      navigate("/host/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="host-register-container">
      <div className="host-register-card">
        <h2 className="title">Register Charging Station</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Owner Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Contact Email"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Contact Phone"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="stationName"
            placeholder="Station Name"
            onChange={handleChange}
            required
          />

          <div className="inline-inputs">
            <input
              type="number"
              name="totalChargers"
              placeholder="Total Chargers"
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="power"
              placeholder="Power (kW)"
              onChange={handleChange}
              required
            />
          </div>

          <div className="inline-inputs">
            <input
              type="number"
              name="rate"
              placeholder="Rate per kW"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Station Address"
              onChange={handleChange}
              required
            />
          </div>

          {/* =========================
              📍 MAP PICKER SECTION
          ========================== */}
          <h4 style={{ marginTop: "15px" }}>📍 Pick Station Location</h4>

          <MapPicker
            setLocation={(loc) =>
              setLocation({ lat: loc.lat, lng: loc.lng })
            }
          />

          {location.lat && (
            <p className="location-text">
              Selected: {location.lat.toFixed(5)},{" "}
              {location.lng.toFixed(5)}
            </p>
          )}

          <button className="register-btn" type="submit">
            Register Station
          </button>
        </form>
      </div>
    </div>
  );
}

export default HostRegister;
