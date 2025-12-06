import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ⭐ ADD THIS
import "../components/HostRegister.css";

function HostRegister() {
  const navigate = useNavigate();  // ⭐ ADD THIS

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    ports: "",
    power: "",
    rate: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    alert("Host Registered Successfully!");

    // ⭐ AFTER SUCCESS → GO TO Host Requests page
    navigate("/hostrequests");
  };

  return (
    <div className="host-register-container">
      <div className="host-register-card">
        <h2 className="title">Host</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          <div className="inline-inputs">
            <input type="text" name="ports" placeholder="Available ports" value={formData.ports} onChange={handleChange} />
            <input type="text" name="power" placeholder="kW" value={formData.power} onChange={handleChange} />
          </div>

          <div className="inline-inputs">
            <input type="text" name="rate" placeholder="Rate/kW" value={formData.rate} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default HostRegister;
