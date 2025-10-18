import React, { useState } from "react";
import "../components/UserRegister.css";

function UserRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    evModel: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
    alert("User Registered Successfully!");
  };

  return (
    <div className="user-register-container">
      <div className="user-register-card">
        <h2 className="title">User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <select
            name="evModel"
            value={formData.evModel}
            onChange={handleChange}
          >
            <option value="">Select EV model</option>
            <option value="Tesla Model 3">Tesla Model 3</option>
            <option value="Nissan Leaf">Nissan Leaf</option>
            <option value="Hyundai Kona">Hyundai Kona</option>
            <option value="MG ZS EV">MG ZS EV</option>
          </select>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;